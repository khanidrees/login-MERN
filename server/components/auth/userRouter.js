const express = require('express');

const router = express.Router();
const { body } = require('express-validator');

const User = require('./userModel');
const userController = require('./userController');

// router.get('/',(req , res, next)=>{
//   res.status(200).json({status:'OK'});
// });
router.post(
  '/register',
  [
    body('name')
      .isString(),
    body('email')
      .isEmail()
      .withMessage('Please Enter Valid Email')
      .custom(async (value) => {
        try {
          const user = await User.findOne({
            email: value,
          });
          console.log(user);
          if (user) {
            throw new Error('E-mail already in use');
          }
        } catch (error) {
          throw new Error(error);
        }
      })
      .normalizeEmail(),
    body('password', 'Min 7 char of only')
      .isLength({ min: 7 })
      .trim(),
  ],
  userController.postUser
  ,
);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please Enter Valid Email')
      .normalizeEmail(),
    body('password', 'Min 7 char of only')
      .isLength({ min: 7 })
      .trim(),
  ],
  userController.loginUser
  ,
);

module.exports = router;
