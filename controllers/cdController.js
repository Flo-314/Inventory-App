var cd = require('../models/cd');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all cds.
exports.cd_list = function(req, res) {
    res.send('NOT IMPLEMENTED: cd list');
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