const mongoose = require('mongoose');

mongoose.set("strictQuery", true);

async function connectToDatabase() {
  try {
    const connection = await mongoose.connect(
      process.env.DB_CONNECT
    );
    // console.log(connection);
    console.log('Successfully connected to database');
  } catch (error) {
    console.error(error);
  }
}


module.exports = {
  connectToDatabase,
};


