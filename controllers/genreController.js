var mongoose = require("mongoose");
var Cd = require("../models/cd");
var Author = require("../models/author");
var Genre = require("../models/genre");
var async = require("async");

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
    genreAuthors.push(cd.author)
  });
  await res.render("genre/genre_details", {
    genre: genre,
    genreCds: genreCds,
    genreAuthors: genreAuthors,
  });
};

// Display Genre create form on GET.
exports.genre_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre create GET");
};

// Handle Genre create on POST.
exports.genre_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre create POST");
};

// Display Genre delete form on GET.
exports.genre_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre delete GET");
};

// Handle Genre delete on POST.
exports.genre_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre delete POST");
};

// Display Genre update form on GET.
exports.genre_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre update GET");
};

// Handle Genre update on POST.
exports.genre_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre update POST");
};
