const express = require('express');
// const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const co = require('co');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/public/index.html`);
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

co(function* () {
  // Connection URL
  const url = 'mongodb://db_reader:db_reader@ds129600.mlab.com:29600/heroku_r48npwqx';
  // Use connect method to connect to the Server
  const db = yield MongoClient.connect(url);
  // Close the connection
  db.collection('eboard').find({}).toArray((err2, items) => {
    if (err2) {
      throw err2;
    }
    db.close();
  });
}).catch((err) => {
  console.log(err.stack);
});

