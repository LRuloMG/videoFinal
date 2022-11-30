const express = require('express');
const router = express.Router();
const controller = require("../controllers/awaitLists");

router.get('/', controller.getAwaitLists);
router.get('/:id', controller.getAwaitList);
router.post('/', controller.create);
router.put('/:id', controller.replace);
router.patch('/:id', controller.edit);
router.delete('/:id', controller.destroy);

module.exports = router;
