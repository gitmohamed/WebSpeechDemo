var express = require('express');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var YouTube = require('youtube-node');
var yt = new YouTube();
var config = require('./config');
var ytApi = config.key;
var app = express();

app.set('port', (process.env.PORT || 3333));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('./dist'));
yt.setKey(ytApi);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/2', function(req, res) {
  res.sendFile(path.join(__dirname, './index2.html'));
});

var callYt = function(q ,callback) {
  yt.search(q, 10, function(error, result) {
    if (error) throw error
    yt.addParam('q', q);
    var link = result.items[0].id.videoId;
    callback(link);
  });
}

app.get('/getVid', function(req, res) {
  var vid = req.query.vid;
  callYt(vid, function(data) {
    res.json(data); // send video id
  });
});

app.get('/3', function(req, res) {
  res.sendFile(path.join(__dirname, './index3.html'));
});

app.listen(app.get('port'), function() {
  console.log('Running app...');
});
