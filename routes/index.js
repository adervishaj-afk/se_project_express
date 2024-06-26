const router = require("express").Router();
const errorMessages = require("../utils/errors");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItem");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.use((req, res) => {
  res.status(errorMessages.NOT_FOUND).send({ message: "Not found route" });
});

module.exports = router;
