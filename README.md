# Typescriot Node Political Speeches

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run start:live

# static file server with hot reload at localhost:3001
$ npm run start:liveFileServer

# build the project
$ npm run build
```

### `staticFileServer/input/csv`

Please put the test data in ./input/csv. These data hosted by express at http://localhost:3001/static/csv/

### `data`

External csv files are downloaded in ./data

### example API request

http://localhost:3000/evaluation?url=http://localhost:3001/static/csv/text1.csv

http://localhost:3000/evaluation?url=http://localhost:3001/static/csv/text1.csv&url=http://localhost:3001/static/csv/text2.csv
