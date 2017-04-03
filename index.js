const express = require('express');
// const assert = require('assert');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/public/index.html`);
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

