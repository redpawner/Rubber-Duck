import { User } from '../models/schema';

const dropDB = async () => {
  try {
    await User.deleteMany({});
    console.log('Database cleared.');
  } catch (error) {
    console.log(error);
  }
};

dropDB();
