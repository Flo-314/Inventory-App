var mongoose = require("mongoose");
var Cd = require("../models/cd");
var Author = require("../models/author");
var Genre = require("../models/genre");
var async = require("async");
const { body, validationResult } = require("express-validator");

// Display list of all Authors.
exports.author_list = async function (req, res) {
  let authorList = await Author.find({});
  await res.render("author/author_list", { authorList: authorList });
};

// Display detail page for a specific Author.
exports.author_detail = async function (req, res) {
  let author = await Author.findById(req.params.id);
  let authorCds = await Cd.find({ author: req.params.id });
  let authorGenre = await Cd.find({ author: req.params.id }, "genres").populate(
    "genre"
  );
  authorGenre.forEach((genre) => {
    let genreArray = genre.genre;
    authorGenre = genreArray;
  });
  await res.render("author/author_detail", {
    author: author,
    authorCds: authorCds,
    authorGenre: authorGenre,
  });
};

// Display Author create form on GET.
exports.author_create_get = function (req, res) {
  res.render("author/author_form");
};

// Handle Author create on POST.
exports.author_create_post = [
  // Validate and santise the name field.
  body("authorName", "Author name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("birthDate", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("deathDate", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  
  // Process request after validation and sanitization.
  async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    console.log(req.body);
    // si hay errrores
    if (!errors.isEmpty()) {
      res.render("author/author_form", { errors: errors.array() });
      //si no hay errores
    } else {
      let url = "/";
      let search = await Author.findOne({ name: req.body.genreName });
      // si no existe el author
      if (search === null || Author.length === 0) {
        let newAuthor = new Author({
          name: req.body.authorName,
          date_of_birth: req.body.birthDate,
          date_of_death: req.body.deathDate,
        });
        newAuthor.save((err) => {
          if (err) {
            return next(err);
          }
          url = "/catalog/author/" + newAuthor.id;
          res.redirect(url);
        });
      } else {
        url = "/catalog/Author/" + search.id;
        res.redirect(url);
      }
    }
  },
];

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
