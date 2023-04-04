import express from 'express';
import { userController } from '../controllers/index.js';

const UserRouter = express.Router();

UserRouter.get('/', userController.getMe);

export default UserRouter;
