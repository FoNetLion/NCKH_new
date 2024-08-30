import paramiko


def create_file_on_client(client_ip, username, password, remote_file_path, content):
    """
    Tạo một file trên máy client qua SSH và ghi nội dung vào đó.

    Args:
        client_ip (str): Địa chỉ IP của máy client.
        username (str): Tên người dùng SSH trên máy client.
        password (str): Mật khẩu SSH trên máy client.
        remote_file_path (str): Đường dẫn tới file cần tạo trên máy client.
        content (str): Nội dung để ghi vào file (mặc định là chuỗi rỗng).
    """
    try:
        # Tạo SSH client
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        # Kết nối tới máy client
        ssh.connect(client_ip, username=username, password=password)

        # Mở file trên máy client để tạo và ghi nội dung
        sftp = ssh.open_sftp()
        with sftp.open(remote_file_path, 'w') as file:
            file.write(content)

        # Đóng kết nối SFTP và SSH
        sftp.close()
        ssh.close()

        print(f"File '{remote_file_path}' đã được tạo thành công trên máy client.")

    except Exception as e:
        print(f"Đã xảy ra lỗi khi tạo file trên client: {str(e)}")

def delete_file_on_client(client_ip, username, password, remote_file_path):
    """
    Xóa một file trên máy client qua SSH.

    Args:
        client_ip (str): Địa chỉ IP của máy client.
        username (str): Tên người dùng SSH trên máy client.
        password (str): Mật khẩu SSH trên máy client.
        remote_file_path (str): Đường dẫn tới file cần xóa trên máy client.
    """
    try:
        # Tạo SSH client
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        # Kết nối tới máy client
        ssh.connect(client_ip, username=username, password=password)

        # Sử dụng SFTP để xóa file
        sftp = ssh.open_sftp()
        sftp.remove(remote_file_path)

        # Đóng kết nối SFTP và SSH
        sftp.close()
        ssh.close()

        print(f"File '{remote_file_path}' đã được xóa thành công trên máy client.")

    except Exception as e:
        print(f"Đã xảy ra lỗi khi xóa file trên client: {str(e)}")

def read_rules_file_from_client(client_ip, username, password, remote_file_path):
    """
    Đọc nội dung của file .rules từ máy client qua SSH.

    Args:
        client_ip (str): Địa chỉ IP của máy client.
        username (str): Tên người dùng SSH trên máy client.
        password (str): Mật khẩu SSH trên máy client.
        remote_file_path (str): Đường dẫn tới file .rules trên máy client.

    Returns:
        str: Nội dung của file .rules.
    """
    try:
        # Tạo SSH client
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        # Kết nối tới máy client
        ssh.connect(client_ip, username=username, password=password)

        # Mở file trên máy client
        sftp = ssh.open_sftp()
        with sftp.open(remote_file_path, 'r') as file:
            content = file.read()

        # Đóng kết nối SFTP và SSH
        sftp.close()
        ssh.close()

        return content.decode('utf-8')  # Trả về nội dung file dưới dạng chuỗi UTF-8

    except Exception as e:
        print(f"Đã xảy ra lỗi khi đọc file từ client: {str(e)}")
        return None

def update_rules_content(content):
    """
    Cập nhật nội dung của file .rules.

    Args:
        content (str): Nội dung của file .rules.

    Returns:
        str: Nội dung đã được cập nhật.
    """
    # Ví dụ: Thêm một dòng mới vào cuối nội dung
    updated_content = content + "\nalert lam -> here"
    return updated_content

def write_rules_file_to_client(client_ip, username, password, remote_file_path, content):
    """
    Ghi đè nội dung đã cập nhật vào file .rules trên máy client qua SSH.

    Args:
        client_ip (str): Địa chỉ IP của máy client.
        username (str): Tên người dùng SSH trên máy client.
        password (str): Mật khẩu SSH trên máy client.
        remote_file_path (str): Đường dẫn tới file .rules trên máy client.
        content (str): Nội dung đã được cập nhật để ghi vào file.
    """
    try:
        # Tạo SSH client
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        # Kết nối tới máy client
        ssh.connect(client_ip, username=username, password=password)

        # Mở file trên máy client để ghi đè
        sftp = ssh.open_sftp()
        with sftp.open(remote_file_path, 'w') as file:
            formatted_content = content.replace("\\n", "\n")
            file.write(formatted_content)

        # Đóng kết nối SFTP và SSH
        sftp.close()
        ssh.close()

        print(f"Nội dung đã được ghi đè thành công vào file trên client: {remote_file_path}")

    except Exception as e:
        print(f"Đã xảy ra lỗi khi ghi file vào client: {str(e)}")

def process_rules_file_on_client(client_ip, username, password, remote_file_path, content_up):
    """
    Thực hiện quy trình đọc, cập nhật và ghi đè file .rules trên máy client từ máy server.

    Args:
        client_ip (str): Địa chỉ IP của máy client.
        username (str): Tên người dùng SSH trên máy client.
        password (str): Mật khẩu SSH trên máy client.
        remote_file_path (str): Đường dẫn tới file .rules trên máy client.
    """
    # Bước 1: Đọc dữ liệu từ file .rules trên máy client
    content = read_rules_file_from_client(client_ip, username, password, remote_file_path)
    
    if content is None:
        return  # Nếu không đọc được file thì thoát ra

    # Bước 2: Cập nhật dữ liệu đã đọc
    updated_content = content_up

    # Bước 3: Ghi đè dữ liệu đã cập nhật vào file trên máy client
    write_rules_file_to_client(client_ip, username, password, remote_file_path, updated_content)

#Ví dụ sử dụng hàm
client_ip = "192.168.189.133"
username = "william"
password = "k"  # Thay thế "k" bằng mật khẩu thực tế của bạn
remote_file_path = "/var/lib/suricata/rules/manh.rules"

#content_up = cli_content + "\n alert lam -> here"
#process_rules_file_on_client(client_ip, username, password, remote_file_path, content_up)
#delete_file_on_client(client_ip, username, password, remote_file_path)
# create_file_on_client(client_ip,username, password, remote_file_path, content = "test")

# cli_content = read_rules_file_from_client(client_ip, username, password, remote_file_path)
# print(cli_content)