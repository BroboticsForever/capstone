#DOCKER VERSION 1.1.2
FROM phusion/baseimage:0.9.16
MAINTAINER Ian Tait <thetaiter@ku.edu>

#INITIAL SETUP
ENV HOME /root

RUN mkdir -p /etc/my_init.d
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/10gen.list
RUN curl -sL https://deb.nodesource.com/setup | bash - 

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

#INSTALL GRUNT-CLI, BOWER, AND MEAN-CLI
RUN npm install -g grunt-cli
RUN npm install -g bower
RUN npm install -g mean-cli

#INSTALL WEBSITE DEPENDENCIES
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install imagemagick

#COPY WEBSITE AND SCRIPTS
COPY ./website /root/website
COPY ./scripts/startup.sh /etc/my_init.d/startup.sh

#SETUP WEBSITE
RUN \
  cd /root/website && \
  npm install && \
  bower --allow-root install && \
  cd packages/contrib/mean-admin && \
  npm install && \
  cd ../socket && \
  npm install && \
  cd ../upload && \
  npm install && \
  cd ../comments && \
  npm install

#CLEANUP
RUN apt-get -y clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#EXPOSE PORTS
EXPOSE 9009

#USE PHUSION INIT SYSTEM
CMD ["/sbin/my_init"]
