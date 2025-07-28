import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  age: Number,
  gender: String,
  password: String,
});

const Users = mongoose.model('Users', usersSchema);

export default Users;
