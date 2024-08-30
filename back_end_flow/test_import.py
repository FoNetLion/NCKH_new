from pymongo import MongoClient
import joblib
#import torch
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)

import seaborn as sns
import matplotlib.pyplot as plt

from sklearn.preprocessing import StandardScaler 
import warnings

from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import time
from sklearn.preprocessing import normalize
#import keras
from tensorflow.keras.models import load_model
import matplotlib.pyplot as plt

client = MongoClient("mongodb://localhost:27017/")
db = client["cici_flow"]

#client ip
ip = "192.168.189.133"
#interface 
intf_str = "ens36"
num_rows = 0
# label_mapping = {"BENIGN": 0, "DoS Hulk": 1,'PortScan':2,'DDoS':3,'DoS GoldenEye':4,
#                  'FTP-Patator':5,'SSH-Patator':6,'DoS slowloris':7,'DoS Slowhttptest':8,'Bot':9,'Web Attack-Brute Force':10,
#                  'Web Attack-XSS':11,'Infiltration':12,'Web Attack-Sql Injection':13,'Heartbleed':14}

label_mapping = {"BENIGN": 0, "PortScan":1, "DoS slowloris": 2, "Bruce Force": 3, "Unknown attack": 4}
reverse_label_mapping = {value: key for key, value in label_mapping.items()}

collection = db[f"flow_data_{ip}_{intf_str}"]

#load model
model = joblib.load("random_forest_model_312_5_label.joblib")

#model = keras.models.load_model('rfc1.md5')
autoencoder = load_model('autoencoder_55_25_12_14_.h5')
print("okk")

#CSDL 
def read_all_data(collection_name):
    cursor = collection.find()

    # Chuyển đổi dữ liệu từ cursor thành danh sách
    all_data = list(cursor)

    # Đóng kết nối đến MongoDB
    #client.close()

    return all_data

def clear_data_only(df):
    df.columns=df.columns.str.strip()
    print("Dataset Shape: ",df.shape)

    num=df._get_numeric_data()
    num[num<0]=0

    df.drop(columns=drop_only_nol_zero, axis=1, inplace=True)
    print("Zero Variance Columns: ", drop_only_nol_zero, "are dropped.")
    print("Shape after removing the zero varaince columns: ",df.shape)

    df.replace([np.inf,-np.inf],np.nan,inplace=True)
    print(df.isna().any(axis=1).sum(),"rows dropped")
    df.dropna(inplace=True)
    print("Shape after Removing NaN: ",df.shape)

    df.drop_duplicates(inplace=True)
    print("Shape after dropping duplicates: ",df.shape)

    df.drop(columns=drop_only_nol_inden,axis=1,inplace=True)
    print("Columns which have identical values: ",drop_only_nol_inden," dropped!")
    print("Shape after removing identical value columns: ",df.shape)
    return df

def reduce_mem_usage(df, verbose=True):
    numerics = ['int16', 'int32', 'int64', 'float16', 'float32', 'float64']
    start_mem = df.memory_usage(deep=True).sum() / 1024**2

    for col in df.columns:
        col_type = df[col].dtypes
        if col_type in numerics:
            c_min = df[col].min()
            c_max = df[col].max()

          
            if str(col_type)[:3] == 'int':
               
                if c_min > np.iinfo(np.int8).min and c_max < np.iinfo(np.int8).max:
                    df[col] = df[col].astype(np.int8)
                elif c_min > np.iinfo(np.int16).min and c_max < np.iinfo(np.int16).max:
                    df[col] = df[col].astype(np.int16)
                elif c_min > np.iinfo(np.int32).min and c_max < np.iinfo(np.int32).max:
                    df[col] = df[col].astype(np.int32)
                elif c_min > np.iinfo(np.int64).min and c_max < np.iinfo(np.int64).max:
                    df[col] = df[col].astype(np.int64)
            else:
               
                if c_min > np.finfo(np.float32).min and c_max < np.finfo(np.float32).max:
                    df[col] = df[col].astype(np.float32)
                else:
                    df[col] = df[col].astype(np.float64)

    
    end_mem = df.memory_usage(deep=True).sum() / 1024**2

   
    if verbose:
        print('Mem. usage decreased to {:5.2f} Mb ({:.1f}% reduction)'.format(end_mem, 100 * (start_mem - end_mem) / start_mem))
    return df

def preprocess_flow(df_f):
    #df_f = df_f[df_f["Destination Port"]!= 443]
    #df_f = df_f[(df_f["Source Port"] != 27017) & (df_f["Destination Port"] != 27017)]
    
    # columns_to_drop = ['Source IP', 'Source Port', 'Destination IP', 'Protocol', 'Timestamp']
    # # Bỏ các cột đã chọn khỏi dataframe
    # df_f = df_f.drop(columns=columns_to_drop, axis=1)
    #df = reduce_mem_usage(df_f)
    #df.shape
    df = df_f.copy()
    train_df = df  

    stats = [] 

    for col in train_df.columns:
       
        stats.append((col,  
                    train_df[col].nunique(), 
                    train_df[col].isnull().sum() * 100 / train_df.shape[0],  
                    train_df[col].value_counts(normalize=True, dropna=False).values[0] * 100, 
                    train_df[col].dtype))  

   
    stats_df = pd.DataFrame(stats, columns=['Feature', 'Unique_values', 'Percentage of missing values', 'Percentage of values in the biggest category', 'type'])
   
    stats_df.sort_values('Percentage of missing values', ascending=False)
    df = df.dropna().reset_index(drop = True)
    df['Flow Bytes/s'].isnull().sum()

    meaningless_feature = stats_df[stats_df['Unique_values']==1]['Feature'].to_list()
    #df = df.drop(columns=meaningless_feature)
    
    inf_cols = df.max()[df.max() == np.inf].index.to_list()
    inf_cols

    for i in inf_cols:
        df[i] = df[i].apply(lambda x:100000000 if x == np.inf else x)
        
    selected_columns1 = ['Bwd Packet Length Mean', 'Total Length of Fwd Packets', 'Flow Bytes/s',
                    'Fwd Packet Length Mean', 'Subflow Fwd Bytes', 'Avg Fwd Segment Size'
                    ,'Fwd Packet Length Std', 'Flow IAT Mean',
                    'Flow IAT Max', 'Fwd IAT Mean', 'Flow Duration',
                    'Fwd Packet Length Max', 'Init_Win_bytes_backward', 'Init_Win_bytes_forward']
    
    df_sl = df[selected_columns1]

    ss = joblib.load('scaler.save')
    df = ss.transform(df_sl)  
        
    return df, df_f

def predict_label(collection):
    data = read_all_data(collection)
    df_f = pd.DataFrame(data)
    df_processed, df_f = preprocess_flow(df_f)
    columns_to_drop = ['_id']

    # Bỏ các cột đã chọn khỏi dataframe
    df_f = df_f.drop(columns=columns_to_drop, axis=1)
    
    # Thực hiện dự đoán
    pred = model.predict_proba(df_processed)
    
    time = df_f["Timestamp"]
    
   
    #df_f['label'] = pred
    #df_st['label'] = pred
    
    return pred*100, time

preb, time1 = predict_label(collection)

print(preb[:,2])
print(type(time1))
print(type(preb))
index = time1.index
x = index[:100]
y = preb[: ,3][:100]

# Vẽ đồ thị đường
plt.plot(x, y, linestyle='-', color='b')

# Thêm tiêu đề và nhãn
plt.title('Biểu đồ đường mẫu')
plt.xlabel('Trục X')
plt.ylabel('Trục Y')

# Hiển thị lưới
plt.grid(True)

# Hiển thị đồ thị
plt.show()
    