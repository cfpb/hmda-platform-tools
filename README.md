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

## Deploy tools
Run the following from the root of the repo to deploy to gh-pages

```
./deploy.sh <project to be deployed>
```
