const router = require("express").Router();
const errorMessages = require("../utils/errors");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItem");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  console.error(err);
  if (err.name === "ValidationError") {
    return res
      .status(errorMessages.BAD_REQUEST)
      .send({ message: errorMessages.ValidationError });
  }

  if (err.name === "CastError") {
    return res
      .status(errorMessages.NOT_FOUND)
      .send({ message: errorMessages.CastError });
  }
  return res
    .status(errorMessages.SERVER_ERROR)
    .send({ message: errorMessages.ServerError });
});

module.exports = router;
