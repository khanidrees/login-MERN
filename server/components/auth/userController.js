const { validationResult } = require('express-validator');
const userService = require('./userService');

const postUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const {
    name, email, password,
  } = req.body;
  try {
    const result = userService.postUser(name, email, password, next);
    return res.status(200).json({
      status: 'ok',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const {
    email, password,
  } = req.body;
  try {
    const response = await userService.loginUser(email, password, next);
    return res.json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postUser,
  loginUser,
};
