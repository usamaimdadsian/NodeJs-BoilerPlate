const express = require('express');
const {ProjectController} = require('@/controllers')
const {authenticate} = require('@/middlewares')

const router = express.Router();
router.get('/all',authenticate,ProjectController.index)
router.post('/save',authenticate,ProjectController.save)
router.put('/:id',authenticate,ProjectController.update)
router.delete('/:id',authenticate,ProjectController.delete)
router.get('/:id',authenticate,ProjectController.show)

module.exports = router