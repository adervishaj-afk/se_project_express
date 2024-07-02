const router = require("express").Router();
const { getUsers, getUserById, getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/", auth, getUsers);
router.get("/:userId", auth, getUserById);
router.get("/me", auth, getCurrentUser)

// router.get("/", getUsers);
// router.get("/:userId", getUserById);
// router.post("/", createUser);

// router.post("/", signin)
// router.post("/", signup)
// router.get("/", items);

module.exports = router;
