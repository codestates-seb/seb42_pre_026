#!/bin/sh

cd /home/hj/seb42_pre_026/client
npm run build && cp -r /home/hj/seb42_pre_026/client/build/* /home/hj/seb42_pre_026/server/build/resources/main/static/
cd /home/hj/seb42_pre_026/client
npm start &

cd /home/hj/seb42_pre_026/server
/home/hj/seb42_pre_026/server/gradlew build && java -jar /home/hj/seb42_pre_026/server/build/libs/stack-over-flow-clone-0.0.1-SNAPSHOT.war
