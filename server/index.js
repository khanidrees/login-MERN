const app = require('./app');
const { connectToDatabase } = require('./db/connect');

require('dotenv').config();

const PORT = process.env.PORT || 8008;

connectToDatabase()
  .then(async () => {
    app.listen(PORT, () => {
      console.log('server started at ', PORT);
    });
  })
  .catch((e) => {
    console.log('db connection error'+e);
  });
