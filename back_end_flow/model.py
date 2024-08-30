from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from pydantic.types import Json

# Class để mô tả một ObjectID tùy chỉnh trong Pydantic
class PyObjectId(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate
    
    @classmethod
    def validate(cls, v):
        if not isinstance(v, ObjectId):
            raise ValueError("Not a valid ObjectId")
        return str(v)

class FlowData(BaseModel):
    id: Optional[PyObjectId] = None  # ObjectId sẽ được chuyển thành string
    source_ip: str
    source_port: int
    destination_ip: str
    destination_port: int
    protocol: int
    timestamp: datetime
    flow_duration: float
    total_fwd_packets: int
    total_backward_packets: int
    total_length_of_fwd_packets: int
    total_length_of_bwd_packets: int
    fwd_packet_length_max: float
    fwd_packet_length_min: float
    fwd_packet_length_mean: float
    fwd_packet_length_std: float
    bwd_packet_length_max: float
    bwd_packet_length_min: float
    bwd_packet_length_mean: float
    bwd_packet_length_std: float
    flow_bytes_s: float
    flow_packets_s: float
    flow_iat_mean: float
    flow_iat_std: float
    flow_iat_max: float
    flow_iat_min: float
    fwd_iat_total: float
    fwd_iat_mean: float
    fwd_iat_std: float
    fwd_iat_max: float
    fwd_iat_min: float
    bwd_iat_total: float
    bwd_iat_mean: float
    bwd_iat_std: float
    bwd_iat_max: float
    bwd_iat_min: float
    fwd_psh_flags: int
    bwd_psh_flags: int
    fwd_urg_flags: int
    bwd_urg_flags: int
    fwd_header_length: int
    bwd_header_length: int
    fwd_packets_s: float
    bwd_packets_s: float
    min_packet_length: int
    max_packet_length: int
    packet_length_mean: float
    packet_length_std: float
    packet_length_variance: float
    fin_flag_count: int
    syn_flag_count: int
    rst_flag_count: int
    psh_flag_count: int
    ack_flag_count: int
    urg_flag_count: int
    cwe_flag_count: int
    ece_flag_count: int
    down_up_ratio: float
    average_packet_size: float
    avg_fwd_segment_size: float
    avg_bwd_segment_size: float
    init_win_bytes_forward: int
    init_win_bytes_backward: int
    act_data_pkt_fwd: int
    min_seg_size_forward: int
    active_mean: float
    active_std: float
    active_max: float
    active_min: float
    idle_mean: float
    idle_std: float
    idle_max: float
    idle_min: float
    subflow_fwd_packets: int
    subflow_fwd_bytes: int
    subflow_bwd_packets: int
    subflow_bwd_bytes: int
    label: int

# Ví dụ về cách sử dụng:
# flow_data = FlowData(**your_dictionary)
# print(flow_data)


# host = '192.168.190.10'
# port = 22  # Port SSH mặc định
# username = 'william'
# password = 'k'
# command = 'sudo cicflowmeter -i ens33 -c --dir /home/william/Desktop/data'  # Lệnh bạn muốn thực thi