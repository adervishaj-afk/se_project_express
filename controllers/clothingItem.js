const clothingItem = require("../models/clothingItems");
const errorMessages = require("../utils/errors");

const createItem = (req, res) => {
  //  console.log(req);
  //  console.log(req.body);
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => {
      //  console.error(item);
      //  console.log(req.user._id);
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err.name);
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

const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      res
        .status(errorMessages.SERVER_ERROR)
        .send({ message: errorMessages.ServerError, err });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== userId) {
        return res
          .status(errorMessages.PERMISSION_ERROR)
          .send({ message: errorMessages.PermissionsError });
      }
      return clothingItem
        .findByIdAndDelete(itemId)
        .then((deletedItem) => res.status(200).send({ item: deletedItem }));
    })
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
module.exports = { createItem, getItems, deleteItem };
