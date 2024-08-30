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
from datetime import datetime
from schema.file import FileNameInput, FileResponse


protocol_numbers = {
    1: "ICMP",          # Internet Control Message Protocol
    2: "IGMP",          # Internet Group Management Protocol
    3: "GGP",           # Gateway-to-Gateway Protocol
    4: "IP-in-IP",      # IP in IP (encapsulation)
    6: "TCP",           # Transmission Control Protocol
    8: "EGP",           # Exterior Gateway Protocol
    9: "IGP",           # any private interior gateway (used by Cisco for their IGRP)
    17: "UDP",          # User Datagram Protocol
    27: "RDP",          # Reliable Datagram Protocol
    47: "GRE",          # General Routing Encapsulation
    50: "ESP",          # Encapsulating Security Payload
    51: "AH",           # Authentication Header
    57: "SKIP",         # SKIP
    58: "IPv6-ICMP",    # ICMP for IPv6
    59: "IPv6-NoNxt",   # No Next Header for IPv6
    60: "IPv6-Opts",    # Destination Options for IPv6
    88: "EIGRP",        # Enhanced Interior Gateway Routing Protocol
    89: "OSPF",         # Open Shortest Path First
    94: "IPIP",         # IP-within-IP Encapsulation Protocol
    97: "ETHERIP",      # Ethernet-within-IP Encapsulation
    98: "ENCAP",        # Encapsulation Header
    103: "PIM",         # Protocol Independent Multicast
    112: "VRRP",        # Virtual Router Redundancy Protocol
    115: "L2TP",        # Layer Two Tunneling Protocol
    132: "SCTP",        # Stream Control Transmission Protocol
    137: "MPLS-in-IP",  # MPLS-in-IP
    # Có thể thêm nhiều giao thức từ danh sách của IANA
}

port_to_protocol = {
    20: "FTP (Data)",         # File Transfer Protocol (Data Transfer)
    21: "FTP (Control)",      # File Transfer Protocol (Control)
    22: "SSH",                # Secure Shell
    23: "Telnet",             # Telnet protocol
    25: "SMTP",               # Simple Mail Transfer Protocol
    53: "DNS",                # Domain Name System
    80: "HTTP",               # Hypertext Transfer Protocol
    110: "POP3",              # Post Office Protocol v3
    143: "IMAP",              # Internet Message Access Protocol
    443: "HTTPS",             # HTTP Secure (HTTP over TLS/SSL)
    993: "IMAP SSL",          # IMAP over SSL
    995: "POP3 SSL",          # POP3 over SSL
    3306: "MySQL",            # MySQL database server
    3389: "RDP",              # Remote Desktop Protocol
    5432: "PostgreSQL",       # PostgreSQL database server
    6379: "Redis",            # Redis key-value store
    8080: "HTTP Alt",         # Alternative port for HTTP
    # Thêm các cổng và giao thức khác theo nhu cầu
}

#threshold = 0.0006894694064366165
threshold = 0.0027183422921063186

def get_protocol_name(protocol_number):
    return protocol_numbers.get(protocol_number, "Unknown")

def get_port_app_pro(port_number):
    return port_to_protocol.get(port_number, "Unknown")

# class thong ke
class Static:
    def __init__(self, ip_ls, pro_ls, alert_ls, service_ls):
        self.ip_ls = ip_ls
        self.pro_ls = pro_ls
        self.alert_ls = alert_ls
        self.service_ls = service_ls


       

client = MongoClient("mongodb://localhost:27017/")
db = client["cici_flow"]
db_log = client["log_json"]


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
collection_alert = db_log["alert"]
#load model
model = joblib.load("random_forest_model_312_5_label.joblib")

#model = keras.models.load_model('rfc1.md5')
autoencoder = load_model('autoencoder_55_25_12_14_.h5')
print("okk")

#CSDL 


def get_next_id(collection_name):
    # Tìm giá trị _id lớn nhất hiện có
    latest_doc = collection_name.find_one(
        {"_id": {"$regex": "^rl"}},  # Chỉ lấy những document có _id bắt đầu bằng "rl_"
        sort=[("_id", -1)]  # Sắp xếp giảm dần theo _id để lấy document mới nhất
    )
    print(latest_doc)

    if latest_doc:
        # Lấy số hiện tại từ _id, tách phần chữ 'rl_' và chuyển thành số nguyên
        latest_id = int(latest_doc["_id"].split("l")[1])
        next_id = latest_id + 1  # Tăng giá trị _id lên 1
    else:
        # Nếu không có document nào, bắt đầu với giá trị 1
        next_id = 1

    return f"rl{str(next_id).zfill(3)}"  # Trả về _id tiếp theo theo định dạng "rl_x"

def add_rule_file(file_name : FileNameInput, collection_name):
    custom_id = get_next_id(collection_name)
    current_datetime = datetime.now()

# Định dạng ngày tháng năm theo kiểu dd-mm-yyyy
    formatted_date = current_datetime.strftime("%d-%m-%Y")
    document = {
            "_id": custom_id,
            "filename": file_name.file_name,
            "creation_date": formatted_date
        }
        # Thêm document vào collection
    result =collection_name.insert_one(document)
    return result


def remove_file(filename, collection_name):
    result =  collection_name.delete_one({"filename": filename})
    return result

def update_file(filename, collection_name):
    current_datetime = datetime.now()

# Định dạng ngày tháng năm theo kiểu dd-mm-yyyy
    formatted_date = current_datetime.strftime("%d-%m-%Y")
    
    result = collection_name.update_one({"filename":filename}, {"$set": {"creation_date": formatted_date}})
    doc = collection_name.find_one({"filename":filename})
    
    
    return doc
    


def read_all_data(collection_name):
    cursor = collection_name.find()

    # Chuyển đổi dữ liệu từ cursor thành danh sách các từ điển (dict)
    all_data = []
    for document in cursor:
        document["_id"] = str(document["_id"])  # Chuyển đổi ObjectId thành chuỗi
        all_data.append(document)
    
    return all_data




def FilterRead_data(filter_field, filter_value):
    """
    Đọc dữ liệu từ MongoDB và lọc theo trường cụ thể.

    :param filter_field: Trường dùng để lọc dữ liệu.
    :param filter_value: Giá trị của trường để lọc dữ liệu.
    :return: List các documents được lọc.
    """

    # Tạo filter condition
    filter_condition = {filter_field: filter_value}

    # Lọc dữ liệu và chuyển kết quả thành list
    filtered_data = list(collection.find(filter_condition))

    return filtered_data
drop_only_nol_zero = ['Fwd PSH Flags', 'Bwd PSH Flags', 'Fwd URG Flags', 'Bwd URG Flags', 'SYN Flag Count', 'RST Flag Count', 'PSH Flag Count', 'ACK Flag Count'
                      , 'URG Flag Count', 'CWE Flag Count', 'ECE Flag Count', 'Fwd Avg Bytes/Bulk'
                      , 'Fwd Avg Packets/Bulk', 'Fwd Avg Bulk Rate', 'Bwd Avg Bytes/Bulk', 'Bwd Avg Packets/Bulk', 'Bwd Avg Bulk Rate', ]

drop_only_nol_inden = [ 'Subflow Fwd Packets', 'Subflow Bwd Packets', 'Avg Fwd Segment Size', 'Avg Bwd Segment Size', 'Fwd Header Length.1', 'Average Packet Size']




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
def preprocess_autoencoder(df):
    drop = [ 'Source IP','Destination IP', 'Source Port', 'Timestamp'
        , 'Protocol' ,'label']
    df.drop(columns=drop, axis=1, inplace=True)
    
    df = clear_data_only(df)
    index = df.index
    print(df.info())
    df.columns=df.columns.str.strip().str.lower().str.replace(' ','_').str.replace('(','').str.replace(')','')
    scaler = joblib.load('minmax_scaler1.save')
    X = scaler.transform(df)
    return X, index

def predict_anomalies(model , X, threshold):
    # Dự đoán output bằng autoencoder
    reconstructed = model.predict(X)
    
    # Tính reconstruction error
    reconstruction_errors = np.mean((X - reconstructed) ** 2, axis=1)
    
    # So sánh error với ngưỡng để nhận diện bất thường
    # Nếu error > threshold, đánh dấu là bất thường (1), ngược lại là bình thường (0)
    anomalies = np.where(reconstruction_errors > threshold, 4, 0)
    
    return anomalies



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



#Tien xu li du lieu 
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

# Giả sử data được đọc từ hàm read_all_data(collection) và bạn đã có `data`


# Gọi hàm preprocess để tiền xử lý dữ liệu

# In DataFrame sau khi thêm cột 'label'


def predict_label(collection):
    data = read_all_data(collection)
    df_f = pd.DataFrame(data)
    df_processed, df_f = preprocess_flow(df_f)
    columns_to_drop = ['_id']

    # Bỏ các cột đã chọn khỏi dataframe
    df_f = df_f.drop(columns=columns_to_drop, axis=1)
    
    # Thực hiện dự đoán
    pred = model.predict(df_processed)
    
   
    df_f['label'] = pred
    #df_st['label'] = pred
    df_f['label'] = df_f['label'].map(reverse_label_mapping)
    #df_st['label'] = df_st['label'].map(reverse_label_mapping)
    
    df_benign = df_f[df_f['label'] == 'BENIGN']
    #df_benign.loc[(df_benign["Source Port"] == 27017) &( df_benign["Destination Port"] == 27017), "label"] = 'BENIGN'
    if df_benign.shape[0] > 0:
    
        df_pre, index = preprocess_autoencoder(df_benign)
        
        pred_au = predict_anomalies(autoencoder,df_pre, threshold)
        
        print(pred_au)
        
        vectorized_map = np.vectorize(reverse_label_mapping.get)

    # Áp dụng ánh xạ cho mảng
        pred_au = vectorized_map(pred_au)
        
        #pred_au = pred_au.map(reverse_label_mapping)
        
        df_f.loc[index, 'label'] = pred_au
        
        df_f.loc[(df_f["Source Port"] == 27017) | (df_f["Destination Port"] == 27017), 'label'] = "BENIGN"
    
    
    df_st = df_f[['Source IP', 'Source Port', 'Destination IP', 'Destination Port', 'Protocol', 'Timestamp', 'Flow Duration', 'label']]

    #print(df_f)
    
    return df_f.to_dict(orient='records'), df_st.to_dict(orient='records')
    #return df_f
        
df_p, df_st = predict_label(collection)

# ham thong ke
def get_ls(df_st):
    service_ls = {}
    pro_ls = {}
    ip_ls = {}
    alert_ls = {}
    st1 = Static(pro_ls, ip_ls, alert_ls, service_ls) 
    
    for d in df_st:
        if get_protocol_name(int(d['Protocol'])) not in st1.pro_ls.keys():
            st1.pro_ls[get_protocol_name(int(d['Protocol']))] = 0
            
        if get_protocol_name(int(d['Protocol'])) in st1.pro_ls.keys():
            st1.pro_ls[get_protocol_name(int(d['Protocol']))] += 1
    
        if get_port_app_pro(int(d['Destination Port'])) not in st1.service_ls.keys():
            st1.service_ls[get_port_app_pro(int(d['Destination Port']))] = 0
            
        if get_port_app_pro(int(d['Destination Port'])) in st1.service_ls.keys():
            st1.service_ls[get_port_app_pro(int(d['Destination Port']))] += 1
        
        if d['Source IP']+'-'+d['Destination IP'] not in st1.ip_ls.keys():
            st1.ip_ls[d['Source IP']+'-'+d['Destination IP']] = 0
            
        if d['Source IP']+'-'+d['Destination IP'] in st1.ip_ls.keys():
            st1.ip_ls[d['Source IP']+'-'+d['Destination IP']] += 1
            
        if d['label'] not in st1.alert_ls.keys():
            st1.alert_ls[d['label']] = 0
        
        if d['label'] in st1.alert_ls.keys():
            st1.alert_ls[d['label']] += 1
    
    return st1


def Filter(field, value, df_st):
    filter_data = []
    print(field, ':', value)
    for d in df_st:
        if d[field] == value:
            filter_data.append(d)
            print(field, ':', value)      
    return filter_data

#du doan bat thuong
def get_alert (df_st):
    l_df_a = []
    sum_sql_dos = 0
    sum_sql = 0
    for row in df_st:
        if row['label'] != 'BENIGN' : 
            #row['label'] = row['label'].map(label_mapping)
            l_df_a.append(row)
            # print(row['label'])
            # print(len(l_df_a))
    #     if row["Destination Port"] == 27017 and row['label'] != 'BENIGN':
    #         sum_sql_dos += 1
    #     if row["Destination Port"] == 27017:
    #         sum_sql += 1
    # print(sum_sql_dos)
    #print(sum_sql_dos/sum_sql)   
    return l_df_a
   


#print(read_all_data(collection_name=collection_alert))     
# kq =  get_alert(df_st)
# print(kq)

# st2 = get_ls(df_st)

# # print(st2.ip_ls)
# print(st2.pro_ls)
# # print(st2.service_ls)

# field = 'Protocol'
# value = 17

#print(Filter(field, value, df_st))

# all_data = read_all_data(collection)

# print(all_data)



