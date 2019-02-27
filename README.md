# Serverless REST API example

This repo provides an example Serverless REST API. It uses **AWS Lambda** and NoSQL **DynamoDB** database.

## Getting Started

You need to have **serverless** installed globally. If you don't have please run:

```
$ npm install -g serverless
```

### Installing

To install dependencies run:

```
$ npm install
```

### Start local server

To run a local server you must use a special **serverless-offline** plugin, run:

```
$ sls offline
```

You should see something like that:

```
Serverless: Offline listening on http://localhost:3000
```

### Configuration

You have to setup your own configuration in **serverless.yml**, if you want to deploy this code on AWS.

### Deployment

```
$ sls deploy
```
