var mongoose = require("mongoose")
var Cd = require('../models/cd');
var Author = require('../models/author');
var Genre = require('../models/genre');
var async = require('async');
const { body } = require("express-validator");

exports.index =  async function(req, res) {
     async.parallel({
        cd_count: function(callback) {
            Cd.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },

        author_count: function(callback) {
            Author.countDocuments({}, callback);
        },
        genre_count: function(callback) {
            Genre.countDocuments({}, callback);
        }
    }, function(err, results) {
        console.log(results)
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    }); 
};

// Display list of all cds.
exports.cd_list = async function(req, res) {
    let cdList =  await Cd.find({}).sort({title:1}).populate("author genre")
    await res.render('cd/cd_list', {cdList: cdList });
};

// Display detail page for a specific cd.
exports.cd_detail = async function(req, res) {
    let cd = await Cd.findById(req.params.id).populate("author genre")
    console.log(cd)

    await res.render('cd/cd_details', {cd: cd });
};


// Display cd create form on GET.
exports.cd_create_get = function(req, res) {
    res.render("cd/cd_form");
};

;

// Handle cd create on POST.
exports.cd_create_post =[
/*     // Validate and santise the name field.
    body("genreName", "Genre name must contain at least 3 characters")
      .trim()
      .isLength({ min: 3 })
      .escape(),
  
    // Process request after validation and sanitization.
    async (req, res, next) => {
      const errors = validationResult(req);
  // si hay errrores
      if (!errors.isEmpty()) {
        res.render("genre/genre_form", { error: errors.array() });
        console.log("BIEN BIEN")
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
    }, */
  ];

// Display cd delete form on GET.
exports.cd_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: cd delete GET');
};

// Handle cd delete on POST.
exports.cd_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: cd delete POST');
};

// Display cd update form on GET.
exports.cd_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: cd update GET');
};

// Handle cd update on POST.
exports.cd_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: cd update POST');
};