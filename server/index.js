const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//Router
const userRouter = require("./routes/Users");
const commentRouter = require("./routes/Comments");
app.use("/users", userRouter);
app.use("/comments", commentRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});
