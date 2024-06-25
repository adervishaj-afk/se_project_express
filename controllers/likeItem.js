const clothingItem = require("../models/clothingItems");
const errorMessages = require("../utils/errors");

module.exports.likeItem = (req, res) =>
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } }, //  add _id to the array if it's not there yet
      { new: true }
    )
    .then((item) => {
      //  console.error(item);
      //  console.log(req.user._id);
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      //  console.error(err.name);
      if (err.name === "ValidationError") {
        return res
          .status(errorMessages.BAD_REQUEST)
          .send({ message: errorMessages.ValidationError });
      }
      if (err.name === "CastError") {
        return res
          .status(errorMessages.NOT_FOUND)
          .send({ message: errorMessages.CastError });
      }
      return res
        .status(errorMessages.SERVER_ERROR)
        .send({ message: errorMessages.ServerError });
    });

module.exports.dislikeItem = (req, res) =>
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, //   remove _id from the array
      { new: true }
    )
    .then((item) => {
      //  console.error(item);
      //  console.log(req.user._id);
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      //  console.error(err.name);
      if (err.name === "ValidationError") {
        return res
          .status(errorMessages.BAD_REQUEST)
          .send({ message: errorMessages.ValidationError });
      }
      if (err.name === "CastError") {
        return res
          .status(errorMessages.NOT_FOUND)
          .send({ message: errorMessages.CastError });
      }
      return res
        .status(errorMessages.SERVER_ERROR)
        .send({ message: errorMessages.ServerError });
    });
