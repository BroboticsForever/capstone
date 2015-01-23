#!/bin/sh
nohup mongod > /var/log/mongo.log &
sleep 30
cd /root/website
TMPDIR=/root/website/files/tmp NODE_ENV=production PORT=9009 grunt > /var/log/website.log 2>&1
