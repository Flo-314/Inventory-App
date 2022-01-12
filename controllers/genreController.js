var mongoose = require("mongoose");
var Cd = require("../models/cd");
var Author = require("../models/author");
var Genre = require("../models/genre");
var async = require("async");
const { body, validationResult } = require("express-validator");
const genre = require("../models/genre");
const multer = require("multer");
const Image = require("../models/image");

// Display list of all Genre.
exports.genre_list = async function (req, res) {
  let genreList = await Genre.find({});
  await res.render("genre/genre_list", { genreList: genreList });
};

// Display detail page for a specific Genre.
exports.genre_detail = async function (req, res) {
  let genre = await Genre.findById(req.params.id).populate("image") ;
  let genreCds = await Cd.find({ genre: req.params.id }).populate("author");

  let genreAuthors = [];

  genreCds.forEach((cd) => {
    genreAuthors.push(cd.author);
  });
  await res.render("genre/genre_details", {
    genre: genre,
    genreCds: genreCds,
    genreAuthors: genreAuthors,
    imageSrc: genre.image.src
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
    console.log(req.file);
    const errors = validationResult(req);
    // si hay errrores
    if (!errors.isEmpty()) {
      res.render("genre/genre_form", { errors: errors.array() });
      //si no hay errores
    } else {
      let url = "/";
      let search = await Genre.findOne({ name: req.body.genreName });
      // si no existe el genero
      if (search === null || search.length === 0) {
        // primero crea la imagen
        console.log(req.file);
        let newImage = new Image({
          name: req.file.fieldname,
          desc: req.file.originalname,
          img: {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          },
        });
        newImage.save((err) => {
          if (err){
            return next(err)
          }
        })
        //despues crea el genero con la imagen asociada

        let newGenre = new Genre({ name: req.body.genreName, image: newImage.id });
        newGenre.save((err) => {
          if (err) {
            return next(err);
          }
          url = "/catalog/genre/" + newGenre.id;
          res.redirect(url);
        });
      } else {
        url = "/catalog/genre/" + search.id;
        res.redirect(url);
      }
    }
  },
];

// Handle Genre delete on POST.
exports.genre_delete_post = function (req, res) {
  Genre.findByIdAndRemove(req.body.genreId, async function deleteGenre(err) {
    if (err) {
      return next(err);
    }
    res.redirect("/catalog/genres");
  });
};

// Display Genre update form on GET.
exports.genre_update_get = async function (req, res) {
  let id = req.url.slice(7).slice(0, -7);
  let genre = await Genre.findOne({ _id: id });
  res.render("genre/genre_update", { genre: genre.name, id: id });
};

// Handle Genre update on POST.
exports.genre_update_post = async function (req, res, next) {
  await Genre.updateOne(
    { _id: req.body.genreId },
    { $set: { name: req.body.genreName } }
  );

  res.redirect("/catalog/genre/" + req.body.genreId);
};
