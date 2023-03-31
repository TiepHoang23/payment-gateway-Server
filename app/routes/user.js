const express = require('express');
const { userController } = require('../controllers');
const UserRouter = express.Router();
/* GET users listing. */

UserRouter.get('/', userController.getMe);

module.exports = UserRouter;
