import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config({ path: './.config.env' });

const dbConnectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_COLLECTION}.5pjfa.mongodb.net/Boxer-connect?retryWrites=true&w=majority`;

const dbConnection = async () => {
  try {
    await mongoose.connect(dbConnectionString);

    console.log(
      colors.yellow.italic(
        `MongoDB Connected to collection: ${process.env.DB_COLLECTION}`
      )
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnection;
