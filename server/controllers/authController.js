import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ msg: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ firstName, lastName, email, password: hashedPassword });
  res.status(201).json({ msg: "User created" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user._id, email: user.email } });
};

export const getUser = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select('-password');
  res.json(user);
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "Email not found" });

  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5m' });
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 300000;
  await user.save();

  const link = `http://localhost:5173/reset-password/${resetToken}`;
  await sendEmail(email, "Reset Your Password", `Click here: ${link}`);
  res.json({ msg: "Reset link sent to email." });
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user || user.resetToken !== token || user.resetTokenExpiry < Date.now()) {
    return res.status(400).json({ msg: "Invalid or expired token" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();

  res.json({ msg: "Password successfully reset" });
};
