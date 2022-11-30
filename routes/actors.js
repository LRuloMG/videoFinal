const express = require('express');
const router = express.Router();
const controller = require("../controllers/actors");

router.get('/', controller.getActors);
router.get('/:id', controller.getActor);
router.post('/', controller.create);
router.put('/:id', controller.replace);
router.patch('/:id', controller.edit);
router.delete('/:id', controller.destroy);

module.exports = router;