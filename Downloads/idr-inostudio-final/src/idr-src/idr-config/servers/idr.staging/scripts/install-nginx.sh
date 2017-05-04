#!/bin/bash
VERSION=1.11.3
cd /tmp #so we can clean-up easily
wget http://nginx.org/download/nginx-${VERSION}.tar.gz
tar zxvf nginx-1.11.3.tar.gz && rm -f nginx-${VERSION}.tar.gz
cd nginx-${VERSION}
sudo yum install gcc pcre-devel openssl-devel #required libs, not installed by default
./configure \
  --prefix=/etc/nginx \
  --conf-path=/etc/nginx/nginx.conf \
  --pid-path=/var/run/nginx.pid \
  --lock-path=/var/run/nginx.lock \
  --with-http_ssl_module \
  --with-http_v2_module \
  --user=nginx \
  --group=nginx
make
sudo make install
sudo groupadd nginx
sudo useradd -M -g nginx nginx
rm -rf nginx-${VERSION}
