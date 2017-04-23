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
  async: true,
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

co(function* () {
  const db = yield MongoClient.connect(url);
  app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
  });
  app.get('/e_board/e_board.html', (request, response) => {
    getEboardMembers(db, (eboardMembers) => {
      const eboardData = ({ eboardMembers: eboardMembers[0].members });
      nunjucks.render('templates/e_board_template.html', eboardData, (err, res) => {
        if (err) {
          throw err;
        } else {
          response.send(res);
        }
      });
    });
  });
  // app.get('/', (request, response) => {
  //   response.sendFile(path.join(__dirname, '/public/index.html'));
  // });
  // app.get('/index.html', (request, response) => {
  //   response.sendFile(path.join(__dirname, '/public/index.html'));
  // });
  app.get('/', (request, response) => {
    getHomeData(db, (home) => {
      const homeData = {};
      nunjucks.render('templates/index_template.html', homeData, (err, res) => {
        if (err) {
          throw err;
        } else {
          response.send(res);
        }
      });
    });
  });
  app.get('/index.html', (request, response) => {
    getHomeData(db, (home) => {
      const homeData = {};
      nunjucks.render('templates/index_template.html', homeData, (err, res) => {
        if (err) {
          throw err;
        } else {
          response.send(res);
        }
      });
    });
  });
  app.get('/history/history.html', (request, response) => {
    getHistoryArticles(db, (history) => {
      const historyData = {};
      nunjucks.render('templates/history_template.html', historyData, (err, res) => {
        if (err) {
          throw err;
        } else {
          response.send(res);
        }
      });
    });
  });
  app.get('/newsletter/newsletter.html', (request, response) => {
    getNewsletterArticles(db, (newsletter) => {
      const newsletterData = {};
      nunjucks.render('templates/newsletter_template.html', newsletterData, (err, res) => {
        if (err) {
          throw err;
        } else {
          response.send(res);
        }
      });
    });
  });
  app.get('/donations/donations.html', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/donations/donations.html'));
  });
}).catch((err) => {
  console.log(err.stack);
});
