const express = require('express');
const router = express.Router();
const controller = require("../controllers/members");

router.get('/', controller.getMembers);
router.get('/:id', controller.getMember);
router.post('/', controller.create);
router.put('/:id', controller.replace);
router.patch('/:id', controller.edit);
router.delete('/:id', controller.destroy);

module.exports = router;
