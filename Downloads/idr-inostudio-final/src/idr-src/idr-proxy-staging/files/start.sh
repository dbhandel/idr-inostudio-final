#!/bin/sh
[ -z "$DOMAIN" ] && echo "You forgot to pass a DOMAIN" && exit 1;
[ -z "$UPSTREAM" ] && echo "You forgot to pass an UPSTREAM" && exit 1;

# replace ENV variables
CMD="envsubst \\\$DOMAIN,\\\$UPSTREAM"
$CMD < /etc/nginx/hosts/http.template > /etc/nginx/hosts/http.conf
$CMD < /etc/nginx/hosts/https.template > /etc/nginx/hosts/https.conf

# run web server
nginx
