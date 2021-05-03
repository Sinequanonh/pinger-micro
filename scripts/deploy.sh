cd /Users/leobaecker/dev/pinger-micro;
zip -rq zipped package.json https-measurer.js index.js health.js certOptions.js ping.js handleError.js;

# AMS1 Amsterdam 1
scp zipped.zip root@ams.hyperping.io:/root/pinger-micro
ssh root@ams.hyperping.io "
cd /root/pinger-micro;
unzip -qo zipped.zip;
rm zipped.zip;
npm i;
pm2 reload micro;
exit;
"

# AMS2 Amsterdam 2 Scaleway
scp zipped.zip root@51.15.126.183:/root/pinger-micro
ssh root@51.15.126.183 "
cd /root/pinger-micro;
unzip -qo zipped.zip;
rm zipped.zip;
npm i;
pm2 reload micro;
exit;
"

# Sydney
scp -i ./certs/ec2-sydney.pem zipped.zip ec2-user@ec2-3-25-83-137.ap-southeast-2.compute.amazonaws.com:/home/ec2-user/pinger-micro
ssh -i ./certs/ec2-sydney.pem ec2-user@ec2-3-25-83-137.ap-southeast-2.compute.amazonaws.com "
cd /home/ec2-user/pinger-micro;
unzip -qo zipped.zip;
npm i;
rm zipped.zip;
pm2 reload micro;
exit;
"

# Virginia
scp -i ./certs/ec2-virginia.pem zipped.zip ec2-user@ec2-34-239-101-59.compute-1.amazonaws.com:/home/ec2-user/pinger-micro
ssh -i ./certs/ec2-virginia.pem ec2-user@ec2-34-239-101-59.compute-1.amazonaws.com "
cd /home/ec2-user/pinger-micro;
unzip -qo zipped.zip;
npm i;
rm zipped.zip;
pm2 reload micro;
exit;
"

# California http://52.53.152.139:3000 CLF1
scp -i ./certs/ec2-california.pem zipped.zip ec2-user@ec2-52-53-152-139.us-west-1.compute.amazonaws.com:/home/ec2-user/pinger-micro
ssh -i ./certs/ec2-california.pem ec2-user@ec2-52-53-152-139.us-west-1.compute.amazonaws.com "
cd /home/ec2-user/pinger-micro;
unzip -qo zipped.zip;
npm i;
rm zipped.zip;
pm2 reload micro;
exit;
"

# San Francisco (Actually California) http://13.56.138.59:3000 SFO6
# LOCATION=sanfrancisco pm2 restart micro --update-env
scp -i ./certs/ec2-california.pem zipped.zip ec2-user@ec2-13-56-138-59.us-west-1.compute.amazonaws.com:/home/ec2-user/pinger-micro
ssh -i ./certs/ec2-california.pem ec2-user@ec2-13-56-138-59.us-west-1.compute.amazonaws.com "
cd /home/ec2-user/pinger-micro;
unzip -qo zipped.zip;
npm i;
rm zipped.zip;
pm2 reload micro;
exit;
"

# San Francisco (actually California) http://18.144.90.5:3000 SFO3
# LOCATION=sanfrancisco pm2 restart micro --update-env
scp -i ./certs/ec2-california.pem zipped.zip ec2-user@ec2-18-144-90-5.us-west-1.compute.amazonaws.com:/home/ec2-user/pinger-micro
ssh -i ./certs/ec2-california.pem ec2-user@ec2-18-144-90-5.us-west-1.compute.amazonaws.com "
cd /home/ec2-user/pinger-micro;
unzip -qo zipped.zip;
npm i;
rm zipped.zip;
pm2 reload micro;
exit;
"

# Toronto http://35.182.202.195:3000 TOR2
scp -i ./certs/ec2-toronto.pem zipped.zip ec2-user@ec2-35-182-202-195.ca-central-1.compute.amazonaws.com:/home/ec2-user/pinger-micro
ssh -i ./certs/ec2-toronto.pem ec2-user@ec2-35-182-202-195.ca-central-1.compute.amazonaws.com "
cd /home/ec2-user/pinger-micro;
unzip -qo zipped.zip;
npm i;
rm zipped.zip;
pm2 reload micro;
exit;
"

# London http://18.130.89.77:3000 LON1
scp -i ./certs/ec2-london.pem zipped.zip ec2-user@ec2-18-130-89-77.eu-west-2.compute.amazonaws.com:/home/ec2-user/pinger-micro
ssh -i ./certs/ec2-london.pem ec2-user@ec2-18-130-89-77.eu-west-2.compute.amazonaws.com "
cd /home/ec2-user/pinger-micro;
unzip -qo zipped.zip;
npm i;
rm zipped.zip;
pm2 reload micro;
exit;
"

# Seoul http://13.125.63.75:3000 SEO1
scp -i ./certs/ec2-seoul.pem zipped.zip ec2-user@ec2-13-125-63-75.ap-northeast-2.compute.amazonaws.com:/home/ec2-user/pinger-micro
ssh -i ./certs/ec2-seoul.pem ec2-user@ec2-13-125-63-75.ap-northeast-2.compute.amazonaws.com "
cd /home/ec2-user/pinger-micro;
unzip -qo zipped.zip;
npm i;
rm zipped.zip;
pm2 reload micro;
exit;
"

# Mumbai http://35.154.18.153:3000 MBA1
scp -i ./certs/ec2-mumbai.pem zipped.zip ec2-user@ec2-35-154-18-153.ap-south-1.compute.amazonaws.com:/home/ec2-user/pinger-micro
ssh -i ./certs/ec2-mumbai.pem ec2-user@ec2-35-154-18-153.ap-south-1.compute.amazonaws.com "
cd /home/ec2-user/pinger-micro;
unzip -qo zipped.zip;
npm i;
rm zipped.zip;
pm2 reload micro;
exit;
"

# Paris http://52.47.165.143:3000 PAR1
scp -i ./certs/ec2-paris.pem zipped.zip ec2-user@ec2-52-47-165-143.eu-west-3.compute.amazonaws.com:/home/ec2-user/pinger-micro
ssh -i ./certs/ec2-paris.pem ec2-user@ec2-52-47-165-143.eu-west-3.compute.amazonaws.com "
cd /home/ec2-user/pinger-micro;
unzip -qo zipped.zip;
npm i;
rm zipped.zip;
pm2 reload micro;
exit;
"

# Sao Paulo http://18.229.134.190:3000 SAO1
scp -i ./certs/ec2-saopaulo.pem zipped.zip ec2-user@ec2-18-229-134-190.sa-east-1.compute.amazonaws.com:/home/ec2-user/pinger-micro
ssh -i ./certs/ec2-saopaulo.pem ec2-user@ec2-18-229-134-190.sa-east-1.compute.amazonaws.com "
cd /home/ec2-user/pinger-micro;
unzip -qo zipped.zip;
npm i;
rm zipped.zip;
pm2 reload micro;
exit;
"

# Frankfurt http://18.156.173.152:3000 FRA9
scp -i ./certs/ec2-frankfurt.pem zipped.zip ec2-user@ec2-18-156-173-152.eu-central-1.compute.amazonaws.com:/home/ec2-user/pinger-micro
ssh -i ./certs/ec2-frankfurt.pem ec2-user@ec2-18-156-173-152.eu-central-1.compute.amazonaws.com "
cd /home/ec2-user/pinger-micro;
unzip -qo zipped.zip;
npm i;
rm zipped.zip;
pm2 reload micro;
exit;
"

# Frankfurt http://35.159.52.76:3000 FRA8
scp -i ./certs/ec2-frankfurt.pem zipped.zip ec2-user@ec2-35-159-52-76.eu-central-1.compute.amazonaws.com:/home/ec2-user/pinger-micro
ssh -i ./certs/ec2-frankfurt.pem ec2-user@ec2-35-159-52-76.eu-central-1.compute.amazonaws.com "
cd /home/ec2-user/pinger-micro;
unzip -qo zipped.zip;
npm i;
rm zipped.zip;
pm2 reload micro;
exit;
"

# BLR Bangalore http://143.110.180.198:3000 BLR1 DO (BLR-1 datacenter)
scp zipped.zip root@143.110.180.198:/root/pinger-micro
ssh root@143.110.180.198 "
cd /root/pinger-micro;
unzip -qo zipped.zip;
npm i;
rm zipped.zip;
pm2 reload micro;
exit;
"

# # Singapore http://13.212.12.210:3000 SGP1 AWS
scp -i ./certs/ec2-singapore.pem zipped.zip ec2-user@ec2-13-212-12-210.ap-southeast-1.compute.amazonaws.com:/home/ec2-user/pinger-micro
ssh -i ./certs/ec2-singapore.pem ec2-user@ec2-13-212-12-210.ap-southeast-1.compute.amazonaws.com "
cd /home/ec2-user/pinger-micro;
unzip -qo zipped.zip;
npm i;
rm zipped.zip;
pm2 reload micro;
exit;
"

rm zipped.zip;
