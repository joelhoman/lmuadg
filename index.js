const express = require('express');
// const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const co = require('co');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/public/index.html`);
});

const getEboardMembers = (db, callback) => {
  db.collection('eboard').find({}).toArray((err, items) => {
    if (err) {
      throw err;
    }
    callback(items);
  });
};

const getHistoryArticles = (db, callback) => {
  db.collection('history').find({}).toArray((err, items) => {
    if (err) {
      throw err;
    }
    callback(items);
  });
};

const getNewsletterArticles = (db, callback) => {
  db.collection('newsletter').find({}).toArray((err, items) => {
    if (err) {
      throw err;
    }
    callback(items);
  });
};

const getHomeData = (db, callback) => {
  db.collection('home').find({}).toArray((err, items) => {
    if (err) {
      throw err;
    }
    callback(items);
  });
};

co(function* () {
  // Connection URL
  const url = 'mongodb://db_reader:db_reader@ds129600.mlab.com:29600/heroku_r48npwqx';
  // Use connect method to connect to the Server
  const db = yield MongoClient.connect(url);
  app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
  });
  // Close the connection
  getEboardMembers(db, (items) => {
    console.log(items);
  });
  getHistoryArticles(db, (items) => {
    console.log(items);
  });
  getNewsletterArticles(db, (items) => {
    console.log(items);
  });
  getHomeData(db, (items) => {
    console.log(items);
  });
  db.close();
}).catch((err) => {
  console.log(err.stack);
});

