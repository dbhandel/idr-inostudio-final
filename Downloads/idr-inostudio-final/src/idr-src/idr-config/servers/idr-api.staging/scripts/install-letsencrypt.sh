#!/bin/bash
cd /tmp
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
mv certbot-auto /usr/bin/
certbot-auto certonly -c /www/letsencrypt/idr-api.ini --renew-by-default --debug
