var express = require('express');
var router = express.Router();
var carpoolController = require('../controllers/carpoolController.js');

/*
 * GET
 */
router.get('/', carpoolController.list);

/*
 * GET
 */
router.get('/:id', carpoolController.show);

/*
 * POST
 */
router.post('/', carpoolController.create);

/*
 * PUT
 */
router.put('/:id', carpoolController.update);

/*
 * DELETE
 */
router.delete('/:id', carpoolController.remove);

/*
 * POST
 */
router.post('/search', carpoolController.search);

module.exports = router;
