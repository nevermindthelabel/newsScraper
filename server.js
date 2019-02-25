const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const cheerio = require('cheerio');
const axios = require('axios');
const db = require('./models');

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

const PORT = process.env.PORT || 5000;

// initialize express
const app = express();

// configure our middleware
app.use(logger('dev'));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// connect to mongodb
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('mongoose connected');
  })
  .catch(error => console.log(error));

// configure handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);

app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  db.Article.find({ saved: false }, (error, data) => {
    let hbsObject = {
      article: data
    };
    res.render('index', hbsObject);
  });
});

app.get('/scrape', () => {
  axios.get('https://www.nhl.com').then(res => {
    let $ = cheerio.load(res.data);
    $('h4.headline-link').each((i, element) => {
      let results = {};
      results.title = $(element)
        .text()
        .trim();
      results.summery = $(element)
        .siblings('h5.mixed-feed__subheader')
        .text();
      results.link = $(element)
        .parent()
        .attr('href');
      db.Article.create(results)
        .then(dbArticle => {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(error => {
          // If an error occurred, log it
          console.log(error);
        });
      res.end();
    });
  });
});

app.get('/articles', (req, res) => {
  db.Article.find({})
    .then(articles => {
      res.json(articles);
    })
    .catch(error => {
      res.status(500);
      console.log(error);
    });
});

// Route for saving/updating an Article's associated Note
app.post('/articles/saved/:id', (req, res) => {
  db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
    .then(dbArticle => {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.get('/saved', (req, res) => {
  db.Article.find({ saved: true })
    .populate('notes')
    .then((articles, error) => {
      console.log(articles);
      let hsbObject = {
        articles
      };
      res.render('savedArticles', hsbObject);
    });
});

app.post('articles/deleted/:id', (req, res) => {
  db.Article.findOneAndDelete({ _id: req.params.id });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

module.exports = app;
