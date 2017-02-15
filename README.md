# HMDA Platform Tools

### This repository is a work in progress.

Information and code contained in this repository should be considered provisional and a work in progress unless otherwise indicated.

## Introduction to HMDA

For more information on HMDA, checkout the [About HMDA page](http://www.consumerfinance.gov/data-research/hmda/learn-more) on the CFPB website.

## HMDA Tools

### File Format Verification Tool (work in progress)

The [File Format Verification Tool](https://cfpb.github.io/hmda-platform-tools/file-format-verification/) is an electronic file format verification tool for filers who wish to confirm that a LAR is formatted in the required pipe delimited text file format. This verification tool will be available on a webpage that runs independently from the HMDA Platform and provides a convenient test mechanism for filers.

###Setup

`cd file-format-verification`
`docker build -t ffvt .`
`docker run -p "3000:80" -v "$(pwd)/dist:/usr/src/app/dist" ffvt`
Visit your site at your docker host IP at the above mapped port (eg `192.168.99.100:3000`)

##Deploy tools
Run the following from the root of the repo to deploy to gh-pages
`npm install`
`./deploy.sh <project to be deployed>`
