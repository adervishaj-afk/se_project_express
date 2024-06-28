const router = require("express").Router();

const {
  createItem,
  getItems,
  /* updateItem */ deleteItem,
} = require("../controllers/clothingItem");
const { likeItem, dislikeItem } = require("../controllers/likeItem");

//  CRUD

//  Create
router.post("/", createItem);

//  Read
router.get("/", getItems);

//  Update
//  router.put("/:itemId", updateItem)

router.put("/:itemId/likes", likeItem);

router.delete("/:itemId/likes", dislikeItem);

//  Delete
router.delete("/:itemId", deleteItem);

module.exports = router;
