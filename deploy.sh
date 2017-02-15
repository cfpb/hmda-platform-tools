#!/bin/bash
if [ ! -d "$1" ]
then
  echo "Provide the subproject which you want to deploy"
  exit 1
fi

mkdir "$1/dist/$1"
mv $1/dist/* "$1/dist/$1" 2>/dev/null
npm run deploy -- -a -d "$1/dist"
mv $1/dist/$1/* $1/dist/
rmdir "$1/dist/$1"

echo "Deployed..!"
