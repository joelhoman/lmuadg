const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const co = require('co');
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();
const url = 'mongodb://db_reader:db_reader@ds129600.mlab.com:29600/heroku_r48npwqx';

nunjucks.configure('public', {
  autoescape: true,
  watch: true,
  express: app,
});

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'html');

app.use('/images', express.static(path.join(__dirname, '/public/images')));
app.use('/css', express.static(path.join(__dirname, '/public/css')));
app.use('/bin', express.static(path.join(__dirname, '/public/bin')));
app.use('/navbar', express.static(path.join(__dirname, '/public/navbar')));
app.use('/src', express.static(path.join(__dirname, '/public/src')));
app.use('/footer', express.static(path.join(__dirname, '/public/footer')));

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
// const getDataFromMongoDB = (collection, callback) => {
//   MongoClient.connect(url, (err, db) => {
//     db.collection(collection).find({}).toArray((err, docs) => {
//       callback(docs);
//     });
//   });
// };

co(function* () {
  // Connection URL
  // Use connect method to connect to the Server
  const db = yield MongoClient.connect(url);
  app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
  });
  app.get('/e_board/e_board.html', (request, response) => {
    response.send(nunjucks.render('templates/e_board_template.html'));
  });
  app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/index.html'));
  });
  app.get('/index.html', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/index.html'));
  });
  // app.get('./public/history', (err, res) => {
  //   getHistoryArticles(db, (items) => {
  //     res.render('history.nunjucks', { items });
  //   });
  // });
  // app.get('/newsletter/', (err, res) => {
  //   getNewsletterArticles(db, (items) => {
  //     res.render('newsletter.nunjucks', { items });
  //   });
  // });
  // nunjucks.render('templates/e_board_template.html', (err, res) => {
  //   if (err) {
  //     throw err;
  //   } else {
  //     res.render('e_board/e_board.html');
  //     return getEboardMembers(db, (eboardMembers) => {
  //       console.log(eboardMembers[0].members);
  //       return { eboardMembers: eboardMembers[0].members };
  //     });
  //   }
  // });
}).catch((err) => {
  console.log(err.stack);
});

// env.addFilter('getEboardMembers', (db, callback) => {
//   getEboardMembers(db, callback);
// }, true);

// env.addFilter('getHomeData', (db, callback) => {
//   getHomeData(db, callback);
// }, true);

// env.addFilter('getHistoryArticles', (db, callback) => {
//   getHistoryArticles(db, callback);
// }, true);

// env.addFilter('getNewsletterArticles', (db, callback) => {
//   getNewsletterArticles(db, callback);
// }, true);
// const Loader = nunjucks.Loader.extend({
//   async: true,

//   getSource: (name, callback) => {
//     // load template
//     callback(err, res);
//   },
// });

// const appRouter = (app, queryMongo) => {
//   app.get('/', (err, res) => {
//     const collection = 'home';
//     queryMongo(collection, (items) => {
//       res.render('results', { items });
//     });
//   });

//   app.get('/history', (err, res) => {
//     const collection = 'history';
//     queryMongo(collection, (items) => {
//       res.render('results', { items });
//     });
//   });

//   app.get('/newsletter', (err, res) => {
//     const collection = 'newsletter';
//     queryMongo(collection, (items) => {
//       res.render('results', { items });
//     });
//   });

//   app.get('/eboard', (err, res) => {
//     const collection = 'eboard';
//     queryMongo(collection, (items) => {
//       res.render('results', { items });
//     });
//   });
// };
