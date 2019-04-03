#!/bin/bash

EB_APP="micro-node-app-demo"
STAGING_BRANCH="staging"
PRODUCTION_BRANCH="master"

# Determine the environment to deploy to based on which branch this commit is on
NODE_ENV=''
if [[ $TRAVIS_BRANCH == $STAGING_BRANCH ]]; then
  NODE_ENV="staging"
elif [[ $TRAVIS_BRANCH == $PRODUCTION_BRANCH ]]; then
  NODE_ENV="production"
else
  # Don't want to deploy if it's not one of the above branches
  echo "Not deploying"
  exit
fi

# EB_ENV="$EB_APP-$NODE_ENV"
EB_ENV="production-node"
echo "Deploying to $EB_ENV"

pip install --user --upgrade awsebcli
pip install --upgrade pip

# Configure AWS credentials for Elastic Beanstalk
mkdir -p ~/.aws
echo '[profile eb-cli]' > ~/.aws/config
echo "AWS_ACCESS_KEY_ID = $AWS_ACCESS_KEY_ID" >> ~/.aws/config
echo "AWS_SECRET_ACCESS_KEY = $AWS_SECRET_ACCESS_KEY" >> ~/.aws/config
echo "AWS_REGION = $AWS_REGION" >> ~/.aws/config

echo "Deploying using elasticbeanstalk"
eb use $EB_ENV
eb status

# Deploy application to the appropriate ElasticBeanstalk env
eb deploy $EB_ENV -v
rm ~/.aws/config