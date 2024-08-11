require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { login, createUser } = require("./controllers/users");
const mainRouter = require("./routes/index");
const {
  validateCreateUser,
  validateLogin,
} = require("./middlewares/validation");
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001 } = process.env;
const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    //  console.log("Connected to DB");
  })
  .catch(console.error);
app.use(cors());
const routes = require("./routes");
app.use(express.json());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post("/signin", validateLogin, login);
app.post("/signup", validateCreateUser, createUser);
//Enable the request logger before all route handlers:
app.use(requestLogger);
app.use(routes);
app.use("/", mainRouter);
//The error logger needs to be enabled after the route handlers and before the error handlers:
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  //  console.log(`Server is running on port ${PORT}`);
});
