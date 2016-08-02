const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const YouTube = require('youtube-node');
const yt = new YouTube();
const config = require('./config');
const ytApi = config.key;
const app = express();

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
    if (error) console.error(error);
    // yt.addParam('q', q);
    let vids = [] // Array of video ids to send to client
    for (let id in result.items) {
      if (result.items.hasOwnProperty(id)) {
        if (result.items[id].id.kind === 'youtube#video') {
          vids.push(result.items[id].id.videoId)
        }
      }
    }
    callback(vids[0]) // return the videos as callback
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
