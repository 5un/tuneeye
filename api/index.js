'use strict';

const request = require('superagent');
const SPOTIFY_API = 'https://api.spotify.com/v1';
const gcloud = require('google-cloud');
const vision = gcloud.vision({
  projectId: 'song-vision',
  keyFilename: './secret/song-vision-d0c18850dbfe.json'
});

exports.http = (req, res) => {
  console.log('Hello from "http"');
  if (req.method === `OPTIONS`) {
    res.set('Access-Control-Allow-Origin', "*")
     .set('Access-Control-Allow-Methods', 'GET, POST')
     .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
     .status(200).send({});
    return;
  }

  res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Methods', 'GET, POST')

  res
    .status(200)
    .send({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: req.body,
    });
};

exports.suggestmusic = (req, res) => {
  // Do something with event.body
  if (req.method === `OPTIONS`) {
    res.set('Access-Control-Allow-Origin', "*")
     .set('Access-Control-Allow-Methods', 'GET, POST')
     .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
     .status(200).send({});
    return;
  }

  res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Methods', 'GET, POST')

  var buf = Buffer.from(req.body.image, 'base64');
  vision.detectLabels(buf, function(err, labels, apiResponse) {
    if(labels.length > 0) {
      request
        .get(SPOTIFY_API + '/search')
        .query({ type: 'track', q: labels[0] })
        .end(function(err, spotifyRes){
          res.status(200).send(spotifyRes.body);

        }); 
    } else {
      res.status(200).send(apiResponse);
      //callback(null, response);
    }
  });
 
};
