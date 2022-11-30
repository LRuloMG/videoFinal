const express = require('express');
const router = express.Router();
const controller = require("../controllers/directors");

router.get('/', controller.getDirectors);
router.get('/:id', controller.getDirector);
router.post('/', controller.create);
router.put('/:id', controller.replace);
router.patch('/:id', controller.edit);
router.delete('/:id', controller.destroy);

module.exports = router;