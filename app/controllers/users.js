const { User } = require('../database/models');

async function getMe(req, res) {
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

module.exports = {
  getMe,
};
