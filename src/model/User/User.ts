import * as mongoose  from 'mongoose';
import { IUser } from './IUser';
const bcrypt = require('bcrypt');

interface IUserModel extends IUser, mongoose.Document {}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default:  Date.now },
  typeUser: { type: String }, 
  updatedAt: { type: Date },
});

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const User = mongoose.model<IUserModel>('User', UserSchema);
export = User;
