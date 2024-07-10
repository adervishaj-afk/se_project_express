const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const errorMessages = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res
          .status(errorMessages.NOT_FOUND)
          .send({ message: errorMessages.NotFoundError });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(errorMessages.BAD_REQUEST)
          .send({ message: err.message });
      }
      return res
        .status(errorMessages.ServerError)
        .send({ message: errorMessages.ServerError });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res
          .status(errorMessages.NOT_FOUND)
          .send({ message: errorMessages.NotFoundError });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(errorMessages.SERVER_ERROR)
        .send({ message: errorMessages.ServerError });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        return res
          .status(errorMessages.PERMISSION_ERROR)
          .send({ message: errorMessages.PermissionsError });
      }
      return res
        .status(errorMessages.SERVER_ERROR)
        .send({ message: errorMessages.ServerError });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res
          .status(errorMessages.DUPLICATE_EMAIL)
          .send({ message: errorMessages.ExistingUser });
      }

      return bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          if (!hashedPassword) {
            throw new Error("Password hashing failed");
          }

          return User.create({ name, avatar, email });
        })
        .then((user) => res.status(200).send(user));
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        return res
          .status(errorMessages.DUPLICATE_EMAIL)
          .send({ message: errorMessages.ExistingUser });
      }
      return res
        .status(errorMessages.SERVER_ERROR)
        .send({ message: errorMessages.ServerError });
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
