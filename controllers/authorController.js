var mongoose = require("mongoose");
var Cd = require("../models/cd");
var Author = require("../models/author");
var Genre = require("../models/genre");
var async = require("async");
const { body, validationResult } = require("express-validator");
const Image = require("../models/image");

// Display list of all Authors.
exports.author_list = async function (req, res) {
  let authorList = await Author.find({});
  await res.render("author/author_list", { authorList: authorList });
};

// Display detail page for a specific Author.
exports.author_detail = async function (req, res) {
  let author = await Author.findById(req.params.id).populate("image");
  let authorCds = await Cd.find({ author: req.params.id });
  let authorGenre = await Cd.find({ author: req.params.id }, "genres").populate(
    "genre"
  );
  authorGenre.forEach((genre) => {
    let genreArray = genre.genre;
    authorGenre = genreArray;
  });
  if(author.image){
  await res.render("author/author_detail", {
    author: author,
    authorCds: authorCds,
    authorGenre: authorGenre,
    imageSrc: author.image.src,
  });
}
else{
  await res.render("author/author_detail", {
    author: author,
    authorCds: authorCds,
    authorGenre: authorGenre,
  });
}
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
        let newImage = new Image({
          name: req.file.fieldname,
          desc: req.file.originalname,
          img: {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          },
        });
        newImage.save((err) => {
          if (err) {
            return next(err);
          }
        });

        let newAuthor = new Author({
          name: req.body.authorName,
          date_of_birth: req.body.birthDate,
          date_of_death: req.body.deathDate,
          image: newImage.id,
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

// Handle Author delete on POST.
exports.author_delete_post = async function (req, res) {
  Author.findByIdAndRemove(req.body.authorId, async function deleteAuthor(err) {
    if (err) {
      return next(err);
    }
    res.redirect("/catalog/authors");
  });
};

// Display Author update form on GET.
exports.author_update_get = async function (req, res) {
  let id = req.url.slice(8).slice(0, -7);
  let author = await Author.findOne({ _id: id });
  res.render("author/author_update", {
    authorId: author.name,
    id: author.id,
    authorBirth: author.date_of_birth,
    authorDeath: author.date_of_death,
  });
};

// Handle Author update on POST.
exports.author_update_post = [
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
  async function (req, res) {
    const errors = validationResult(req);
    // si hay errrores

    if (!errors.isEmpty()) {
      res.redirect("/catalog/author/" + req.body.id);
      //si no hay errores
    } else {
      let search = await Author.findOne({ name: req.body.authorName });
      // si no existe el author
      if (search === null || Author.length === 0) {
        await Author.updateOne(
          { _id: req.body.id },
          {
            $set: {
              name: req.body.authorName,
              date_of_birth: req.body.authorBirth,
              date_of_death: req.body.authorDeath,
              id: req.body.authorId,
            },
          }
        );
        res.redirect("/catalog/author/" + req.body.id);
      } else {
        res.redirect("/catalog/author/" + req.body.id);
      }
    }
  },
];
