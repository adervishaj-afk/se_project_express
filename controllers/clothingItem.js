const clothingItem = require("../models/clothingItems");
const errorMessages = require("../utils/errors");


const createItem = (req, res) => {
    //  console.log(req);
    //  console.log(req.body);
  const { name, weather, imageURL } = req.body;

  clothingItem
    .create({ name, weather, imageURL })
    .then((item) => {
        //  console.error(item);
        //  console.log(req.user._id);
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      //  console.error(err.name);
      if (err.name === "ValidationError") {
        return res.status(errorMessages.BAD_REQUEST).send({ message: errorMessages.ValidationError });
      }
      if (err.name === 'CastError') {
        return res.status(errorMessages.NOT_FOUND).send({ message: errorMessages.CastError });
      }
        return res.status(errorMessages.SERVER_ERROR).send({ message: errorMessages.ServerError});
    });
};

const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(errorMessages.BAD_REQUEST).send({ message: errorMessages.ValidationError });
      }
      if (err.name === 'CastError') {
        return res.status(errorMessages.NOT_FOUND).send({ message: errorMessages.CastError });
      }
        return res.status(errorMessages.SERVER_ERROR).send({ message: errorMessages.ServerError});
    });
};

//   const updateItem = (req, res) => {
//     const { itemId } = req.params;
//     const { imageURL } = req.body;
//     clothingItem
//       .findByIdAndUpdate(itemId, { $set: { imageURL } })
//       .orFail()
//       .then((item) => res.status(200).send({ data: item }))
//       .catch((err) => {
//         console.error(err);
//         res.status(errorMessages.SERVER_ERROR).send({ message: errorMessages.UpdateItemError });
//       });
//   };

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({item}))
    .catch((err) => {
      //  console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: errorMessages.ValidationError });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: errorMessages.CastError });
      }
        return res.status(errorMessages.SERVER_ERROR).send({ message: errorMessages.ServerError});
    });
};

module.exports = { createItem, getItems, /* updateItem */ deleteItem };

