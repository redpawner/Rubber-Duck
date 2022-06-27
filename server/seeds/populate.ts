import seeds from './seeds';
import { User } from '../models/schema';

const dropDB = async () => {
  try {
    await User.deleteMany({});
    console.log('Database cleared.');
  } catch (error) {
    console.log(error);
  }
};

const seedDB = async () => {
  await User.insertMany(seeds);
  console.log('Database seeded.');
};

dropDB().then(() => seedDB());
