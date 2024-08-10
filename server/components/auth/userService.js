const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./userModel');

async function postUser(name, email, password, next) {  
  try {
    const hashedPassword = bcrypt.hash(password, 12);
    // console.log('User', User);
    const user = await User.create({
      name, email, password: hashedPassword,
    });
    return user;
  } catch (err) {
    next(err);
  }
}

async function loginUser(email, password, next) {
  const user = await User.findOne({ email }).select('password').lean();

  if (user) {
    return bcrypt.compare(password, user.password).then(async (result) => {
      if (!result) { return { error: 'Incorrect email or password' }; }
      // login
      const token = await jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 8),
        id: user._id,
      }, process.env.JWT_PRIVATE_KEY);
      // console.log('token', token);
      return {
        loggedIn: true,
        token,
      };
    }).catch(next);
  }
  return { error: 'Incorrect email or password' };
}

module.exports = {
  postUser,
  loginUser,
};
