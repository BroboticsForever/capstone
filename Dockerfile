#DOCKER VERSION 1.1.2
FROM phusion/baseimage:0.9.12
MAINTAINER Ian Tait <thetaiter@ku.edu>

#INITIAL SETUP
ENV HOME /root

RUN mkdir -p /etc/my_init.d
RUN add-apt-repository ppa:chris-lea/node.js
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/10gen.list
RUN apt-get update 

#INSTALL BUILD ESSENTIALS
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install gcc make build-essential

#INSTALL GIT
RUN \
  DEBIAN_FRONTEND=noninteractive apt-get -y install git && \
  git config --global user.name "Ian Tait" && \
  git config --global user.email "thetaiter@ku.edu" && \
  git config --global push.default simple

#INSTALL NODEJS
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install nodejs

#INSTALL MONGODB
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install -q mongodb-10gen
RUN mkdir -p /data/db && mkdir -p /etc/service/mongo
RUN chown -R mongodb:mongodb /data
RUN echo "bind_ip = 0.0.0.0" >> /etc/mongodb.conf

ADD ./scripts/run_mongo.sh /etc/service/mongo/run
RUN chown root /etc/service/mongo/run

#INSTALL GRUNT-CLI && BOWER
RUN npm install -g grunt-cli
RUN npm install -g bower
RUN npm install -g mean-cli

#COPY WEBSITE AND SCRIPTS
COPY ./website /root/website
COPY ./scripts/startup.sh /etc/my_init.d/startup.sh

#SETUP WEBSITE
RUN \
  cd /root/website && \
  npm install && \
  bower --allow-root install

#CLEANUP
RUN apt-get -y clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#EXPOSE PORTS
EXPOSE 80

#USE PHUSION INIT SYSTEM
CMD ["/sbin/my_init"]
