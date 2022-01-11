var mongoose = require("mongoose");
var Cd = require("../models/cd");
var Author = require("../models/author");
var Genre = require("../models/genre");
var async = require("async");
const { body, validationResult } = require("express-validator");
const genre = require("../models/genre");

// Display list of all Genre.
exports.genre_list = async function (req, res) {
  let genreList = await Genre.find({});
  await res.render("genre/genre_list", { genreList: genreList });
};

// Display detail page for a specific Genre.
exports.genre_detail = async function (req, res) {
  let genre = await Genre.findById(req.params.id);
  let genreCds = await Cd.find({ genre: req.params.id }).populate("author");

  let genreAuthors = [];

  genreCds.forEach((cd) => {
    genreAuthors.push(cd.author);
  });
  await res.render("genre/genre_details", {
    genre: genre,
    genreCds: genreCds,
    genreAuthors: genreAuthors,
  });
};

// Display Genre create form on GET.
exports.genre_create_get = function (req, res) {
  res.render("genre/genre_form");
};

// Handle Genre create on POST.
exports.genre_create_post = [
  // Validate and santise the name field.
  body("genreName", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    const errors = validationResult(req);
// si hay errrores
    if (!errors.isEmpty()) {
      res.render("genre/genre_form", { errors: errors.array() });
      //si no hay errores
    } else {
      let url  = "/"
      let search = await Genre.findOne({ name: req.body.genreName });
// si no existe el genero
      if (search === null||search.length === 0) {
        let newGenre = new Genre({ name: req.body.genreName });
        newGenre.save((err) => {
          if (err) {
            return next(error);
          }
          url = "/catalog/genre/"+newGenre.id
          res.redirect(url);
        });
      } else {
        url = "/catalog/genre/"+search.id
        res.redirect(url);
      }
    }
  },
];


// Handle Genre delete on POST.
exports.genre_delete_post = function (req, res) {
  console.log(req.body.genreId)
   Genre.findByIdAndRemove(req.body.genreId, async function deleteGenre(err) {
    if (err) {
      return next(err);
    }
    res.redirect("/catalog/genres");
  }); 
};

// Display Genre update form on GET.
exports.genre_update_get = function (req, res) {
  res.render("genre/genre_update");
};

// Handle Genre update on POST.
exports.genre_update_post = function (req, res) {
  Genre.replaceOne(
    { id: req.body.id },
    {
      name: req.body.genre
    }
  );
  res.render("/catalog/genre/" + req.body.id);
};
