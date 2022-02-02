const express = require('express');

const {UserController} = require('@/controllers')
const { authenticate } = require('@/middlewares');



const router = express.Router();

router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.get('/me', authenticate,UserController.show);
router.delete('/me', authenticate,UserController.destroy);
router.put('/logout', authenticate,UserController.logout);

module.exports = router;