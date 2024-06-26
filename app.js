const express = require("express");

const mongoose = require("mongoose");

const mainRouter = require("./routes/index");

const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    //  console.log("Connected to DB");
  })
  .catch(console.error);

  //  middleware
app.use((req, res, next) => {
  req.user = {
    _id: "66732f2754d572387524fb87", // paste the _id of the test user created in the previous step
  };
  next();
});

const routes = require("./routes");

app.use(express.json());
app.use(routes);
app.use("/", mainRouter);


app.listen(PORT, () => {
  //  console.log(`Server is running on port ${PORT}`);
});
