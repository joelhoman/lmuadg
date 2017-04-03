const MongoClient = require('mongodb').MongoClient;
const co = require('co');

let data;

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
    data = items;
    db.close();
  });
}).catch((err) => {
  console.log(err.stack);
});
