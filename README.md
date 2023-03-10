# Typescriot Express Political Speeches

This application computes several statistics from input data.
An example of such a csv file can be found in staticFileServer (. /staticFileServer/input/csv/text1.csv).

The application provides an HTTP endpoint that accepts one or more given URLs via query parameters in the path
GET /evaluation?url=url1&url=url2

The CSV file provided in these URLs is downloaded into the application (data/text1.csv), parsed, and three statistics are evaluated, and the answers are provided in JSON. If the question is not answered or there is no clear answer, the result of this field is returned null.

```
1. which politician gave the most speeches in year x?
2. which politician gave the most speeches on the subject of "homeland security"?
3. which politician has the lowest total word count?
```

## Technologies

- TypeScript
- Express
- NodeJS
- nodemon
- Swagger
- Chai
- Mocha


## Quick Start

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run start:live

# static file server with hot reload at localhost:3001
$ yarn run start:liveFileServer

# build the project
$ yarn run build

# test the project
$ yarn test
```

### `staticFileServer/input/csv`

Please put the test data in `./input/csv`. These data hosted by express at http://localhost:3001/static/csv/

### `data`

External csv files are downloaded in `./data`.

### `Example API request`

http://localhost:3000/evaluation?url=http://localhost:3001/static/csv/text1.csv

http://localhost:3000/evaluation?url=http://localhost:3001/static/csv/text1.csv&url=http://localhost:3001/static/csv/text2.csv


## Installation

```
git clone git@github.com:suema0331/My-Typescript-Express-Mocha-with-Swagger.git && cd My-Typescript-Express-Mocha-with-Swagger && yarn install
```

## Start the server

The API for this application is powered by the [Express](https://expressjs.com/) server, which uses [nodemon](https://nodemon.io/) instead of node to monitor the source code and automatically restarts the server when changes are made.

```bash
yarn run start:live
```

To start the development static file server, run the following.

```bash
yarn run start:liveFileServer
```

## Documentation

For documentation purposes, I have created a RESTful API specification using [Swagger](https://swagger.io/). Once you start the development server, you can look at it, check the endpoint definitions from the http://localhost:3000/api-docs/ root, and verify them with the sample parameters.

```
# Example parameters
http://localhost:3001/static/csv/text1.csv
http://localhost:3001/static/csv/text2.csv
```


## Testing

This application uses [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) for unit testing. The test file are written in Typescript in the `spec/` directory. (`spec/evaluation.spec.ts`)

```bash
yarn test
```