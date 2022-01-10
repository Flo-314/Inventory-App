var mongoose = require("mongoose");
var Cd = require("../models/cd");
var Author = require("../models/author");
var Genre = require("../models/genre");
var async = require("async");

// Display list of all Authors.
exports.author_list = async function (req, res) {
  let authorList = await Author.find({})
    .sort({ name: 1 })
    .populate("author genre");
  await res.render("author/author_list", { authorList: authorList });
};

// Display detail page for a specific Author.
exports.author_detail = async function (req, res) {
  let author = await Author.findById(req.params.id);
  let authorCds = await Cd.find({ author: req.params.id });
  let authorGenre = await Cd.find({ author: req.params.id }, "genres").populate(
    "genre"
  );
  authorGenre.forEach(genre => {
    let genreArray = genre.genre
    authorGenre = genreArray
  });
  await res.render("author/author_detail", {
    author: author,
    authorCds: authorCds,
    authorGenre: authorGenre,
  });
};

// Display Author create form on GET.
exports.author_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author create GET");
};

// Handle Author create on POST.
exports.author_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author create POST");
};

// Display Author delete form on GET.
exports.author_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

// Handle Author delete on POST.
exports.author_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// Display Author update form on GET.
exports.author_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// Handle Author update on POST.
exports.author_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update POST");
};
