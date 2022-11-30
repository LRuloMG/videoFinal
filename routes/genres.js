const express = require('express');
const router = express.Router();
const controller = require("../controllers/genres");

router.get('/', controller.getGenres);
router.get('/:id', controller.getGenre);
router.post('/', controller.create);
router.put('/:id', controller.replace);
router.patch('/:id', controller.edit);
router.delete('/:id', controller.destroy);

module.exports = router;