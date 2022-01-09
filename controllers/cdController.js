var mongoose = require("mongoose")
var Cd = require('../models/cd');
var Author = require('../models/author');
var Genre = require('../models/genre');
var async = require('async');

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
    let cdList =  await Cd.find({})
    console.log(cdList)
    await res.render('cd_list', {cdList: cdList });

};

// Display detail page for a specific cd.
exports.cd_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: cd detail: ' + req.params.id);
};

// Display cd create form on GET.
exports.cd_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: cd create GET');
};

// Handle cd create on POST.
exports.cd_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: cd create POST');
};

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