import seeds from "./seeds";
import {User}  from "../models/schema";

console.log(seeds)
const seedDB = async () => {
  await User.insertMany(seeds);
};
seedDB();
