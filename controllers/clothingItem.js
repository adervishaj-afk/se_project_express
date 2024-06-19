const clothingItem = require("../models/clothingItems");


const createItem = (req, res) => {
  //console.log(req);
  console.log(req.body);
  const { name, weather, imageURL } = req.body;

  clothingItem
    .create({ name, weather, imageURL })
    .then((item) => {
      //console.error(item);
      //console.log(req.user._id);
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err.name);
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Information is not valid" });
        return;
      }
      res.status(500).send({ message: "Error from createItem", err });
    });
};

const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      console.error(e);
      res.status(500).send({ message: "Error from getItems", e });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;
  clothingItem
    .findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      console.error(e);
      res.status(500).send({ message: "Error from updateItem", e });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  clothingItem
    .findByIdAndUpdate(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((e) => {
      console.error(e);
      res.status(500).send({ message: "Error from deleteItem", e });
    });
};

module.exports = { createItem, getItems, updateItem, deleteItem };

