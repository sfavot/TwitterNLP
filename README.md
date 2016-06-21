# TwitterNLP

Simple Node.js application to fecth tweets by keywords and apply [Stanford Core NLP](http://stanfordnlp.github.io/CoreNLP/) sentiment analysis on their content.

## Setup

You will need to fill in your twitter access token and consumer key and secrets. You can get them [here](https://apps.twitter.com/).

You will also need to download and build Stanford CoreNLP from their [GitHub repository](https://github.com/stanfordnlp/CoreNLP), as well as the current models that can be found [here](http://nlp.stanford.edu/software/stanford-english-corenlp-models-current.jar).

Then place the models in CoreNLP root folder and run the CoreNLP server by typing `java -mx4g -cp "stanford-corenlp.jar:stanford-english-corenlp-models-current.jar:lib/*" edu.stanford.nlp.pipeline.StanfordCoreNLPServer` in a CLI.

Run `npm install` to install the dependencies then `node server.js` to run the application. It will be available on port 8080 (you can change it in file server.js).

You're all set !
