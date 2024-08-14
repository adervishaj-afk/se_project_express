const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItem");
const NotFoundError = require("../utils/errors/NotFoundError");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
  // res.status(errorMessages.NOT_FOUND).send({ message: "Not found route" });
});

module.exports = router;
