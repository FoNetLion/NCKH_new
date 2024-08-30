import paramiko

def execute_ssh_sudo_command(host, port, username, password, command):
    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh_client.connect(hostname=host, port=port, username=username, password=password)
        
        # Tạo một phiên shell mới
        ssh_session = ssh_client.get_transport().open_session()
        
        if ssh_session.active:
            # Chạy lệnh với sudo
            # Lệnh 'sudo -S' yêu cầu nhập mật khẩu từ stdin nếu cần
            # Bạn cần đảm bảo rằng người dùng có trong file /etc/sudoers để không cần nhập mật khẩu
            
            #ssh_session.exec_command('cd /home/william/Desktop/cici_client/cicflowmeter-py\n')
            ssh_session.exec_command(f"sudo -S -p '' {command}")
            
            # Gửi mật khẩu sudo qua stdin nếu cần
            ssh_session.send(password + "\n")
            ssh_session.shutdown_write()
            
            # Đọc kết quả từ stdout và stderr
            result = ssh_session.recv(1024).decode()
            error = ssh_session.recv_stderr(1024).decode()
            
            print(result)
            
            if error:
                print("Error:", error)
            else:
                print("Output:", result)
    except Exception as e:
        print("Connection failed:", e)
    finally:
        ssh_client.close()

# Thay thế các thông tin dưới đây với thông tin thực tế của bạn
host = '192.168.189.133'
port = 22  # Port SSH mặc định
username = 'william'
password = 'k'
command = '/home/william/Desktop/run_command.sh'  # Lệnh bạn muốn thực thi

execute_ssh_sudo_command(host, port, username, password, command)