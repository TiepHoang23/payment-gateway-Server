import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { User } from '../database/models/index.js';
import { setBlockedToken } from '../database/utils/redisUtils.js';
import { Request, Response } from 'express';

interface SignUpRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

interface LoginRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

interface AuthenticatedRequest extends Request {
  token: {
    token: any;
  };
  userId: string;
}

export async function signUp(req: SignUpRequest, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
  try {
    const { username, password } = req.body;
    const existedUser = await User.findOne({ username }).lean();
    if (existedUser) {
      return res.json({
        isSuccess: false,
        message: 'Username invalid or already exists',
      });
    }
    const hashedPassword = await argon2.hash(password);

    const user = await User.create({ username, hashedPassword });
    return res.json({
      isSuccess: true,
      message: 'Sign up successfully',
      user,
    });
  } catch (err) {
    return res.json({
      isSuccess: false,
      message: err.message,
    });
  }
}

export async function login(req: LoginRequest, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ username }).lean();
    if (!user) {
      return res.json({
        isSuccess: false,
        message: 'Invalid Credentials!',
      });
    }

    const match = await argon2.verify(user.password, password);
    if (!match) {
      return res.json({
        isSuccess: false,
        message: 'Invalid Credentials!',
      });
    }
    const token = jwt.sign({ userId: user._id }, config.jwt.secretKey, {
      expiresIn: config.jwt.expireTime,
    });

    return res.json({
      isSuccess: true,
      message: 'Login successfully',
      token,
      user,
    });
  } catch (err) {
    return res.json({
      isSuccess: false,
      message: err.message,
      token: null,
    });
  }
}

export async function logout(req: AuthenticatedRequest, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
  try {
    const { token } = req.token;
    setBlockedToken(token, config.jwt.expireTime);
    return res.json({
      isSuccess: true,
      message: 'logout success',
    });
  } catch (err) {
    return res.json({
      isSuccess: false,
      message: err.message,
    });
  }
}
export default{login,logout,signUp}