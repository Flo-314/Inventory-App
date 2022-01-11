var mongoose = require("mongoose");
var Cd = require("../models/cd");
var Author = require("../models/author");
var Genre = require("../models/genre");
var async = require("async");
const { body, validationResult } = require("express-validator");
const genre = require("../models/genre");

exports.index = async function (req, res) {
  async.parallel(
    {
      cd_count: function (callback) {
        Cd.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },

      author_count: function (callback) {
        Author.countDocuments({}, callback);
      },
      genre_count: function (callback) {
        Genre.countDocuments({}, callback);
      },
    },
    function (err, results) {
      console.log(results);
      res.render("index", {
        title: "Local Library Home",
        error: err,
        data: results,
      });
    }
  );
};

// Display list of all cds.
exports.cd_list = async function (req, res) {
  let cdList = await Cd.find({}).sort({ title: 1 }).populate("author genre");
  await res.render("cd/cd_list", { cdList: cdList });
};

// Display detail page for a specific cd.
exports.cd_detail = async function (req, res) {
  let cd = await Cd.findById(req.params.id).populate("author genre");
  console.log(cd);

  await res.render("cd/cd_details", { cd: cd });
};

// Display cd create form on GET.
exports.cd_create_get = async function (req, res) {
  let authors = await Author.find({});
  let genres = await Genre.find({});
  res.render("cd/cd_form", { cdGenres: genres, cdAuthors: authors });
};

// Handle cd create on POST.
exports.cd_create_post = [
  // Validate and santise the name field.
  body("cdTitle", "The Title must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("cdAuthor", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("cdDescription", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("cdGenre").escape(),
  body("cdStock", "stock must not be empty").trim().isLength({ min: 1 }).isNumeric().escape(),
  body("cdPrice", "price must not be empty").trim().isLength({ min: 1 }).isNumeric().escape(),


  // Process request after validation and sanitization.
  async (req, res, next) => {
    const errors = validationResult(req);
    // si hay errrores
    if (!errors.isEmpty()) {
      let authors = await Author.find({});
      let genres = await Genre.find({});
      res.render("cd/cd_form", { cdGenres: genres, cdAuthors: authors,  errors: errors.array() });
    } else {
      let url = "/";
      let search = await Cd.findOne({ title: req.body.cdTitle });
      // si no existe el genero
      if (search === null || search.length === 0) {
        let newCd = new Cd({
          title: req.body.cdTitle,
          author: req.body.cdAuthor,
          description: req.body.cdDescription,
          genre: req.body.cdGenre,
          stock: req.body.cdStock,
          price: req.body.cdPrice
        });
        newCd.save((err) => {
          if (err) {
            return next(error);
          }
          url = "/catalog/cd/" + newCd.id;
          res.redirect(url);
        });
      } else {
        url = "/catalog/cd/" + search.id;
        res.redirect(url);
      }
    }
  },
];

// Display cd delete form on GET.
exports.cd_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: cd delete GET");
};

// Handle cd delete on POST.
exports.cd_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: cd delete POST");
};

// Display cd update form on GET.
exports.cd_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: cd update GET");
};

// Handle cd update on POST.
exports.cd_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: cd update POST");
};
