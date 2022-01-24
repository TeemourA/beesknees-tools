import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { removePropertiesFromObject } from '../utils';
import { appSalt } from '../constants/crypt';
import { loginErrorMessage } from '../constants/errorMessages';

const { Schema } = mongoose;
const { isEmail } = validator;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(email: string) {
        if (!isEmail(email)) throw new Error(`Email ${email} is not valid`);
      },
    },
    password: {
      type: String,
      minlength: 7,
      required: true,
      trim: true,
      validate(password: string) {
        if (password.toLowerCase().includes('password'))
          throw new Error('Password should not contain word "password"');
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: { currentTime: () => new Date() },
  }
);

UserSchema.methods.toJSON = function () {
  const user = this;
  const userWithoutSensetiveData = removePropertiesFromObject(user.toObject(), [
    'password',
    'tokens',
  ]);

  return userWithoutSensetiveData;
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.TOKEN_SECRET!
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error(loginErrorMessage);

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) throw new Error(loginErrorMessage);

  return user;
};

UserSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, appSalt);
  }

  next();
});

export const User = mongoose.model('User', UserSchema);
