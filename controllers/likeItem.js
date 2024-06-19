const clothingItem = require("../models/clothingItems");





module.exports.likeItem = (req, res) => clothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
  { new: true },
)
//...

module.exports.dislikeItem = (req, res) => clothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $pull: { likes: req.user._id } }, // remove _id from the array
  { new: true },
)




/*.then((item) => {
  //console.error(item);
  console.log(likes);
  res.send({ likes });
})
.catch((err) => {
  console.error(err.name);
  if (err.name === "ValidationError") {
    res.status(400).send({ message: "Information is not valid" });
    return;
  } else if (err.name === "CastError") {
    return res.status(400).send({ message: err.message });
  }
  else {
  res.status(500).send({ message: "Error from createItem", err });
  }
});*/
//...