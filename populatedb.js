#! /usr/bin/env node
function getRandomInt() {
  return Math.floor(Math.random() * 8);
}

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Cd = require("./models/cd");
var Author = require("./models/author");
var Genre = require("./models/genre");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var authors = [];
var genres = [];
var cds = [];

function authorCreate(name, date_of_birth, date_of_death, cb) {
  authordetail = { name: name };
  if (date_of_birth != false) authordetail.date_of_birth = date_of_birth;
  if (date_of_death != false) authordetail.date_of_death = date_of_death;

  var author = new Author(authordetail);

  author.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Author: " + author);
    authors.push(author);
    cb(null, author);
  });
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });

  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Genre: " + genre);
    genres.push(genre);
    cb(null, genre);
  });
}

function cdCreate(title, author, description, price, genre, stock, cb) {
  cddetail = {
    title: title,
    author: author,

    description: description,
    price: price,
    stock: stock,
    genre: genre,
  };

  var cd = new Cd(cddetail);
  cd.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New cd: " + cd);
    cds.push(cd);
    cb(null, cd);
  });
}

function createGenreAuthors(cb) {
  async.series(
    [
      function (callback) {
        authorCreate("Frédéric Chopin", "1810-02-17", "1849-10-17", callback);
      },
      function (callback) {
        authorCreate(
          "Ludwig van Beethoven",
          "1770-08-25",
          "1827-01-15",
          callback
        );
      },
      function (callback) {
        authorCreate(
          "Wolfgang Amadeus Mozart",
          "1756-05-20",
          "1791-06-17",
          callback
        );
      },
      function (callback) {
        authorCreate(
          "Johann Sebastian Bach",
          "1685-02-17",
          "1750-10-17",
          callback
        );
      },
      function (callback) {
        authorCreate(
          "Luis Alberto Spinetta",
          "1950-01-23",
          "2012-02-08",
          callback
        );
      },
      function (callback) {
        authorCreate("Charly García", "1951-04-26", false, callback);
      },
      function (callback) {
        authorCreate("Pity Álvarez", "1972-05-28", false, callback);
      },
      function (callback) {
        authorCreate("Agustin Lopez Jofre", "2001-01-23", false, callback);
      },
      function (callback) {
        genreCreate("Rock", callback);
      },
      function (callback) {
        genreCreate("Clasical Music", callback);
      },
      function (callback) {
        genreCreate("Baroque", callback);
      },
      function (callback) {
        genreCreate("Rock progresivo", callback);
      },
      function (callback) {
        genreCreate("Rock Cabeza", callback);
      },
      function (callback) {
        genreCreate("Romanticismo", callback);
      },
      function (callback) {
        genreCreate("Romanticismo CABEZA", callback);
      },
      function (callback) {
        genreCreate("Romanticismo PROGRESIVO", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createcds(cb) {
  async.parallel(
    [
    
      function (callback) {
        cdCreate(
          "MUSICA MUSICA MUSIC MUSIC",
          authors[getRandomInt()],
          "JUA JUA JUAJUA",
          500,
          [genres[getRandomInt()]],
          getRandomInt(),
          callback
        );
      },
      function (callback) {
        cdCreate(
          "A music album",
          authors[getRandomInt()],
          "description idk",
          500,
          [genres[getRandomInt()]],
          getRandomInt(),
          callback
        );
      },
      function (callback) {
        cdCreate(
          "Not a music album ",
          authors[getRandomInt()],
          "Aqui me pongo a cantar al compas de la viguela",
          500,
          [genres[getRandomInt()]],
          getRandomInt(),
          callback
        );
      },
      function (callback) {
        cdCreate(
          "El martin fierro",
          authors[getRandomInt()],
          "An album description",
          500,
          [genres[4],genres[2]],
          getRandomInt(),
          callback
        );
      }, 
    ],
    // optional callback
    cb
  );
}

async.series(
  [createGenreAuthors, createcds],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
