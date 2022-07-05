import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const SERVER = process.env.SERVER || '';

async function main() {
  await mongoose.connect(SERVER);
}
main().catch((err) => console.log(err));

let conn = mongoose.connection;
conn.on('connected', function () {
  console.log('Database connected successfully.');
});
conn.on('disconnected', function () {
  console.log('Database disconnected successfully.');
});
conn.on('error', console.error.bind(console, 'connection error:'));

export default conn;
