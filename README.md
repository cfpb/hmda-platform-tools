# HMDA Platform Tools

### This repository is a work in progress.

Information and code contained in this repository should be considered provisional and a work in progress unless otherwise indicated.

## Introduction to HMDA

For more information on HMDA, checkout the [About HMDA page](http://www.consumerfinance.gov/data-research/hmda/learn-more) on the CFPB website.

## HMDA Tools

- [File Format Verification Tool](file-format-verification/README.md)
- [Check Digit Tool](check-digit/README.md)
- [Rate Spread Calculator](rate-spread/README.md)

## Dependencies
 - [yarn](https://yarnpkg.com)

## Install
To install the tools, clone this repo and run the following:
```
yarn
```

## Run locally
After building your desired project, you can visit it by running a static webserver from the project root directory
`yarn start`
or
`docker run -it -p "3000:80" -v "$(pwd):/usr/share/nginx/html" nginx:1.12`

You'd then visit each project at `http://localhost:8081/dist/` or `192.168.99.100:3000/dist` respectively.
