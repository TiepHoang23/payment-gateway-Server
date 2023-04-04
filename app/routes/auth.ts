import express, { Router, Request, Response } from 'express';
import { authController } from '../controllers/index.js';


const authRouter: Router = express.Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.signUp);
authRouter.post('/logout', authController.logout);

export default authRouter;
