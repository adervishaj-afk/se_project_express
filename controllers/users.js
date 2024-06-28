const User = require("../models/user");
const errorMessages = require("../utils/errors");

//  GET users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(errorMessages.SERVER_ERROR)
        .send({ message: errorMessages.ServerError });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(errorMessages.BAD_REQUEST)
          .send({ message: errorMessages.ValidationError });
      }
      return res
        .status(errorMessages.SERVER_ERROR)
        .send({ message: errorMessages.ServerError });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(errorMessages.NOT_FOUND)
          .send({ message: errorMessages.NotFoundError });
      }
      if (err.name === "ValidationError") {
        return res
          .status(errorMessages.BAD_REQUEST)
          .send({ message: errorMessages.ValidationError });
      }
      if (err.name === "CastError") {
        return res
          .status(errorMessages.BAD_REQUEST)
          .send({ message: errorMessages.CastError });
      }
      return res
        .status(errorMessages.SERVER_ERROR)
        .send({ message: errorMessages.ServerError });
    });
};

module.exports = { getUsers, createUser, getUserById };
