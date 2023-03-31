const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../database/models');
const { setBlockedToken } = require('../database/utils/redisUtils');

async function signUp(req, res) {
  try {
    const { username, password } = req.body;
    const existedUser = await User.findOne({ username }).lean();
    if (existedUser) {
      res.json({
        isSuccess: false,
        message: 'Username invalid or already exists',
      });
    }
    const hashedPassword = await argon2.hash(password);
    const { userInput } = args;
    userInput.password = hashedPassword;
    const user = await User.create(userInput);
    res.json({
      isSuccess: true,
      message: 'Sign up successfully',
      user,
    });
  } catch (err) {
    res.json({
      isSuccess: false,
      message: err,
    });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ username }).lean();
    if (!user) {
      res.json({
        isSuccess: false,
        message: 'Invalid Credentials!',
      });
    }

    const match = await argon2.verify(user.password, password);
    if (!match) {
      res.json({
        isSuccess: false,
        message: 'Invalid Credentials!',
      });
    }
    const token = jwt.sign({ userId: user._id }, config.jwt.secretKey, {
      expiresIn: config.jwt.expireTime,
    });

    res.json({
      isSuccess: true,
      message: 'Login successfully',
      token,
      user,
    });
  } catch (err) {
    res.json({
      isSuccess: false,
      message: err.message,
      token: null,
    });
  }
}

async function logout(req, res) {
  try {
    const { token } = req.user.token;
    setBlockedToken(token, config.jwt.expireTime);
    res.json({
      isSuccess: true,
      message: 'logout success',
    });
  } catch (err) {
    res.json({
      isSuccess: false,
      message: err,
    });
  }
}

module.exports = {
  logout,
  signUp,
  login,
};
