#!/bin/bash
if [ ! -d "$1" ]
then
  echo "Provide the subproject which you want to deploy"
  exit 1
fi

(export PATH_PREFIX=/hmda-platform-tools; yarn run "$1")
mkdir "$1/dist/$1"
mv $1/dist/* "$1/dist/$1" 2>/dev/null
yarn run deploy -- -a -d "$1/dist"
mv $1/dist/$1/* $1/dist/
rmdir "$1/dist/$1"

echo "Deployed..!"
