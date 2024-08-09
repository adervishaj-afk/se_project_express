const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateCreateItem, validateId } = require("../middlewares/validation");

const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/clothingItem");

const { likeItem, dislikeItem } = require("../controllers/likeItem");

//  CRUD

//  Create
router.post("/", auth, validateCreateItem, createItem);

//  Read
router.get("/", getItems);

//  Update

router.put("/:itemId/likes", auth, validateId, likeItem);

router.delete("/:itemId/likes", auth, validateId, dislikeItem);

//  Delete
router.delete("/:itemId", auth, validateId, deleteItem);

module.exports = router;
