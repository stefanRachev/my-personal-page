const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (userData) => {
  
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const user = await User.create(userData);

  const result = getResult(user);
  return result;
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  const result = getResult(user);
  return result;
};

function getResult(user) {
  const payload = { _id: user._id, email: user.email, nickName: user.nickName };
  const token = jwt.sign(payload, "SOME_SECRET", { expiresIn: "1h" });

  const result = {
    _id: user._id,
    accessToken: token,
    email: user.email,
    nickName: user.nickName,
  };

  return result;
}