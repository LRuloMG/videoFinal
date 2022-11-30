const express = require('express');
const router = express.Router();
const controller = require("../controllers/copies");

router.get('/', controller.getCopies);
router.get('/:id', controller.getCopy);
router.post('/', controller.create);
router.put('/:id', controller.replace);
router.patch('/:id', controller.edit);
router.delete('/:id', controller.destroy);

module.exports = router;
