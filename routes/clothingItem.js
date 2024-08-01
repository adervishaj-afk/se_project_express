const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/clothingItem");
const { likeItem, dislikeItem } = require("../controllers/likeItem");

//  CRUD

//  Create
router.post("/", auth, createItem);

//  Read
router.get("/", getItems);

//  Update
//  router.put("/:itemId", updateItem)

router.put("/:itemId/likes", auth, likeItem);

router.delete("/:itemId/likes", auth, dislikeItem);

//  Delete
router.delete("/:itemId", auth, deleteItem);

module.exports = router;
