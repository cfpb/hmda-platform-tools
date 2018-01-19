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
To install each tool, clone this repo and run the following:
```
yarn
```

## Build projects
Run the npm script of each tool to build it:

```
yarn run <project to build>
```

## Run locally
After building your desired project, you can visit it by running a static webserver from the project root directory
`http-server -p 3000`
or
`docker run -it -p "3000:80" -v "$(pwd):/usr/share/nginx/html" nginx:1.12`

You'd then visit each project at `localhost:3000/rate-spread/dist` or `192.168.99.100:3000/rate-spread/dist` respectively, substituting `rate-spread` for the project you're interested in visiting.

## Deploy tools
Run the following from the root of the repo to deploy to gh-pages

```
./deploy.sh <project to be deployed>
```
