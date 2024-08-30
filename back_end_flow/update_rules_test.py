import pexpect

def scp_with_password(local_path, remote_user, remote_host, remote_path, password):
    # Tạo câu lệnh scp
    scp_command = f"scp {local_path} {remote_user}@{remote_host}:{remote_path}"
    
    # Sử dụng pexpect để thực thi lệnh scp và tự động nhập mật khẩu
    child = pexpect.spawn(scp_command)
    
    # Tìm kiếm thông báo yêu cầu nhập mật khẩu
    child.expect("password:")
    
    # Nhập mật khẩu
    child.sendline(password)
    
    # Đợi cho đến khi hoàn thành
    child.expect(pexpect.EOF)
    
    print("File đã được sao chép thành công.")

#Sử dụng hàm để thực thi lệnh
scp_with_password(
    local_path="/home/frblam/Desktop/rules_client/manh.rules",
    remote_user="william",
    remote_host="192.168.189.133",
    remote_path="/var/lib/suricata/rules/manh.rules",
    password="k"  # Thay thế "k" bằng mật khẩu thực tế của bạn
)

import paramiko

def read_rules_file_from_server(server_ip, username, password, remote_file_path):
    """
    Hàm kết nối đến máy server qua SSH và đọc nội dung của file .rules.

    Args:
        server_ip (str): Địa chỉ IP của máy server.
        username (str): Tên người dùng để kết nối SSH.
        password (str): Mật khẩu để kết nối SSH.
        remote_file_path (str): Đường dẫn tới file .rules trên máy server.

    Returns:
        str: Nội dung của file .rules từ server.
    """
    try:
        # Tạo SSH client
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        # Kết nối tới server
        ssh.connect(server_ip, username=username, password=password)

        # Mở file trên server
        sftp = ssh.open_sftp()
        with sftp.open(remote_file_path, 'r') as file:
            content = file.read()

        # Đóng kết nối
        sftp.close()
        ssh.close()

        return content.decode('utf-8')  # Trả về nội dung file dưới dạng chuỗi UTF-8

    except Exception as e:
        return f"Đã xảy ra lỗi khi đọc file từ server: {str(e)}"

# Ví dụ sử dụng hàm
server_ip = "192.168.189.133"
username = "william"
password = "k"  # Thay thế "k" bằng mật khẩu thực tế
remote_file_path = "/var/lib/suricata/rules/manh.rules"

file_content = read_rules_file_from_server(server_ip, username, password, remote_file_path)
print(file_content)

