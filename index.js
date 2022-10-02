require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

var urls = {};
var count = 1;
// Your first API endpoint
app.get('/api/shorturl/:short_url', function(req, res) {

  let short_url = req.params.short_url;
  console.log(short_url)

  if (short_url in urls) {

    res.redirect(urls[short_url]);
  }
  else {

    res.json({error: 'invalid url'});
  }
});

app.post("/api/shorturl", function(req, res) {

  const URL_REGEX = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/

  let original = req.body.url;

  if (!URL_REGEX.test(original)) {
      
    res.json({error: 'invalid url'});
  }
  else {
  
    let short = count;
    urls[count++] = original;
    console.log(original);

    res.json({original_url : original,
              short_url : short});
  }
})

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
