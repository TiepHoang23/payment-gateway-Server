import { Request, Response } from 'express';
import { User } from '../database/models/index.js';

async function getMe(req: Request, res: Response): Promise<void> {
  try {
    const id = req.userId;
    const data = await User.findById({ id });

    if (data) {
      res.json({ status: true, data: data });
    } else {
      res.json({ status: false, data: null });
    }
  } catch (error) {
    res.json({ status: false, error: error });
  }
}

export default {
  getMe,
};
