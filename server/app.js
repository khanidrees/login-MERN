const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { isHttpError } = require('http-errors');
const cors = require('cors');

const userRouter = require('./components/auth/userRouter');
const { isAuthorized } = require('./components/auth/auth');

const app = express();

// for security
app.use(helmet());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const whitelist = ['http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      console.log('origin:', origin, 'not allowed')
      callback(new Error('Not allowed by CORS'))
    }
  }
};

app.use(cors(corsOptions));

app.use('/api/v1/users', userRouter);

app.use('/home', isAuthorized, (req, res) => res.status(200).json({ message: 'you are logged in' })); 

app.use((err, req, res, next) => {
  let statusCode = 500;
  let errorMessage = 'Something broke!';
  // console.log('err', JSON.stringify(err));
  console.log(err);
  if (isHttpError(err)) {
    statusCode = err.statusCode;
    errorMessage = err.message;
  }
  return res.status(statusCode).json({
    status: 'failed',
    errors: errorMessage,
  });
});

module.exports = app;
