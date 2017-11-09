const express = require('express');
// const webpack = require('webpack');
// const webpackConfig = require('./webpack.config.js');
const app = express();

const jailed = require('jailed');

// const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/public'));

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('jailed', jailed);
  console.log('Example app listening at http://%s:%s', host, port);
});
