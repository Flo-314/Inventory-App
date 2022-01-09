var express = require('express');
var router = express.Router();

// Require controller modules.
var cd_controller = require('../controllers/cdController');
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController');

/// cd ROUTES ///

// GET catalog home page.
router.get('/', cd_controller.index);

// GET request for creating a cd. NOTE This must come before routes that display cd (uses id).
router.get('/cd/create', cd_controller.cd_create_get);

// POST request for creating cd.
router.post('/cd/create', cd_controller.cd_create_post);

// GET request to delete cd.
router.get('/cd/:id/delete', cd_controller.cd_delete_get);

// POST request to delete cd.
router.post('/cd/:id/delete', cd_controller.cd_delete_post);

// GET request to update cd.
router.get('/cd/:id/update', cd_controller.cd_update_get);

// POST request to update cd.
router.post('/cd/:id/update', cd_controller.cd_update_post);

// GET request for one cd.
router.get('/cd/:id', cd_controller.cd_detail);

// GET request for list of all cd items.
router.get('/cds', cd_controller.cd_list);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/author/create', author_controller.author_create_get);

// POST request for creating Author.
router.post('/author/create', author_controller.author_create_post);

// GET request to delete Author.
router.get('/author/:id/delete', author_controller.author_delete_get);

// POST request to delete Author.
router.post('/author/:id/delete', author_controller.author_delete_post);

// GET request to update Author.
router.get('/author/:id/update', author_controller.author_update_get);

// POST request to update Author.
router.post('/author/:id/update', author_controller.author_update_post);

// GET request for one Author.
router.get('/author/:id', author_controller.author_detail);

// GET request for list of all Authors.
router.get('/authors', author_controller.author_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', genre_controller.genre_create_get);

//POST request for creating Genre.
router.post('/genre/create', genre_controller.genre_create_post);

// GET request to delete Genre.
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// GET request to update Genre.
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update', genre_controller.genre_update_post);

// GET request for one Genre.
router.get('/genre/:id', genre_controller.genre_detail);

// GET request for list of all Genre.
router.get('/genres', genre_controller.genre_list);

module.exports = router;
