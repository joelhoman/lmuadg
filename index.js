const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const co = require('co');
const nunjucks = require('nunjucks');
const path = require('path');
const ObjectId = require('mongodb').ObjectID;

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

app.use((req, res, next) => {
  if (req.url === '/views/history.html') {
    res.redirect(301, '/history');
  } else if (req.url === '/views/e_board.html') {
    res.redirect(301, '/eboard');
  } else if (req.url === '/views/newsletter.html') {
    res.redirect(301, '/newsletter');
  } else if (req.url === '/views/social_media.html') {
    res.redirect(301, '/social');
  } else if (req.url === '/views/donations.html') {
    res.redirect(301, '/donate');
  } else {
    next();
  }
});

const getImage = (db, imageId, callback) => {
  db.collection('fs.chunks').find({ _id: ObjectId(imageId) }).toArray((err, items) => {
    if (err) {
      throw err;
    }
    callback(items);
  });
};

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
  app.get('/eboard', (request, response) => {
    getEboardMembers(db, (eboardMembers) => {
      const eboardData = {
        eboardMembers: eboardMembers[0].members,
        images: [],
      };
      nunjucks.render('templates/e_board_template.html', eboardData, (err, res) => {
        if (err) {
          throw err;
        } else {
          response.send(res);
        }
      });
    });
  });
  app.get('/', (request, response) => {
    getHomeData(db, (home) => {
      const homeData = { fiveSs: home[0] };
      nunjucks.render('templates/index_template.html', homeData, (err, res) => {
        if (err) {
          throw err;
        } else {
          response.send(res);
        }
      });
    });
  });
  app.get('/history', (request, response) => {
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
  app.get('/newsletter', (request, response) => {
    let itemsprocessed = 0;
    getNewsletterArticles(db, (newsletter) => {
      const newsletterData = { newsletterArticles: newsletter[0].articles };
      newsletterData.newsletterArticles.forEach((entry, index, array) => {
        getImage(db, entry.imageId, (image) => {
          const base64Image = new Buffer(image[0].data.buffer).toString('base64');
          newsletterData.newsletterArticles[index].imageId = 'data:image/jpg;base64,' + base64Image;
          itemsprocessed += 1;
          if (itemsprocessed === array.length) {
            nunjucks.render('templates/newsletter_template.html', newsletterData, (err, res) => {
              if (err) {
                throw err;
              } else {
                response.send(res);
              }
            });
          }
        });
      });
    });
  });
  app.get('/social', (request, response) => {
    response.sendFile(path.join(__dirname, 'public/views/social_media.html'));
  });
  app.get('/donate', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/views/donations.html'));
  });
}).catch((err) => {
  console.log(err.stack);
});
