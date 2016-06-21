"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var nlp = require('./nlp');
var Twitter = require('twitter-node-client').Twitter;

const PORT = 8080;

var app = express();
app.set('views', './views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false}));

app.all('/', (req, res) => {

  if (req.method == 'POST') {

    let keywords = req.body.keywords;
    let nb = req.body.nbTweets;

    var twitterClient = new Twitter({
      consumerKey: 'bOtZwwsebvMd7RAYrGn44tblq',
      consumerSecret: 'I9PJIBlOGnKrGH3HCpeK1UHlLaC8u3NNQ2tJqDLQOG5tbPpAVn',
      accessToken: '1521765944-b21V3Gkuge3FsRCwOdjHdU8wXS6n1KIWlqhmrVC',
      accessTokenSecret: 'tHXgOSHZV7rVsUwSEaPrxIqxHW8NPt6d6m4roNglnjgiB'
    });

    // We build the twitter query
    const query = {
      q: keywords + " -filter:retweets -filter:links -filter:images",
      count: nb,
      lang: 'en'
    };

    var tweets = twitterClient.getSearch(query, (err, response, body) => {
      throw err;
    }, (data) => {
      let tweets = JSON.parse(data).statuses.map((tweet) => {
        let text = tweet.text;
        const output = nlp.parse(text, 9000, "ssplit,parse,sentiment", "json");
        const sentiments = output.sentences.map((sentence) => {
          return sentence.sentimentValue;
        });
        const score = sentiments.reduce((sum, a) => { return sum + a },0)/(sentiments.length||1);
        let color = '#d9edf7';
        if (score > 2) {
          color = '#dff0d8';
        } else if (score < 2) {
          color = '#f2dede';
        }
        return {
          text: text,
          color: color,
        };
      });
      res.render('home',
      {
        results: tweets,
        keywords: keywords,
        nbTweets: nb,
      });
    });
  } else {
    res.render('home',
    {
      results: [],
      keywords: '',
      nbTweets: 15,
    });
  }
});

app.listen(PORT);
