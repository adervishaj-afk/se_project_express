const router = require("express").Router();
const {
  getCurrentUser,
  updateUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);

// router.get("/", getUsers);
// router.get("/:userId", getUserById);
// router.post("/", createUser);

// router.post("/", signin)
// router.post("/", signup)
// router.get("/", items);

module.exports = router;
