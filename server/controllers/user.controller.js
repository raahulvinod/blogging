import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

import User from '../models/user.model.js';
import { formatDatatoSend, generateUsername } from '../utils/user-utils.js';

// Signup user
export const signupUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  // Check if the email already exists
  const existingUser = await User.findOne({ 'personal_info.email': email });

  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, error: 'Email is already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const username = await generateUsername(email);

  const user = new User({
    personal_info: {
      fullname,
      email,
      password: hashedPassword,
      username,
    },
  });

  await user.save();

  res.status(200).json(formatDatatoSend(user));
});

export const signinUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ 'personal_info.email': email });

  if (!user) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const isPasswordMatch = await bcrypt.compare(
    password,
    user.personal_info.password
  );

  if (!isPasswordMatch) {
    return res.status(403).json({ error: 'Incorrect password' });
  }

  return res.status(200).json(formatDatatoSend(user));
});
