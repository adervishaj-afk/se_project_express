const express = require("express");

const mongoose = require("mongoose");

const { login, createUser } = require("./controllers/users");

const mainRouter = require("./routes/index");

const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    //  console.log("Connected to DB");
  })
  .catch(console.error);

const cors = require("cors");

app.use(cors());

const routes = require("./routes");

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);

app.use(routes);
app.use("/", mainRouter);

app.listen(PORT, () => {
  //  console.log(`Server is running on port ${PORT}`);
});
