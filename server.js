const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));

const server = app.listen(PORT, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
