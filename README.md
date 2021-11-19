# server-for-certbot
```
sudo dnf module enable nodejs:14 -y
sudo dnf install nodejs -y
sudo npm install -g forever
sudo ln -s /usr/local/bin/forever /usr/bin/forever

sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm -y
sudo dnf update -y
sudo dnf install htop -y

sudo dnf install certbot python3-certbot-apache mod_ssl -y

sudo certbot certonly --webroot -w /home/admin/server-for-certbot/public -d 도메인
```