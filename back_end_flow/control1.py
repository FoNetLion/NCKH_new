import time
import paramiko

# Thay thế bằng thông tin kết nối SSH của bạn
host = '192.168.189.133'
port = 22  # Port SSH mặc định
username = 'william'
password = 'k'
command = 'sudo cicflowmeter -i ens36 -c --dir /home/william/Desktop/data'  # Lệnh bạn muốn thực thi

# Khởi tạo kết nối SSH
ssh_client = paramiko.SSHClient()
ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh_client.connect(host, username=username, password=password)

# Tạo một new shell
ssh_shell = ssh_client.invoke_shell()

# Chạy lệnh `cd Desktop` và sau đó là `sudo ciciflowmeter`
ssh_shell.send('cd /home/william/Desktop/cici_client/cicflowmeter-py\n')
ssh_shell.send(f'echo {password} | sudo -S {command}\n')

# Đọc và in kết quả trả về từ shell
while not ssh_shell.recv_ready():  # Chờ cho đến khi có dữ liệu để đọc
    time.sleep(1)

output = ssh_shell.recv(4096)  # Đọc dữ liệu từ buffer
print(output.decode())

# Đóng kết nối
ssh_shell.close()
ssh_client.close()