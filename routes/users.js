const express=require('express');
const router =express.Router();
const controller=require('../controllers/users');


router.get('/', controller.list);

router.get('/:id', controller.index);

router.post('/', controller.create);

router.patch('/:id', controller.replace);

router.put('/:id', controller.edit);

router.delete('/:id', controller.destroy);

module.exports= router;
