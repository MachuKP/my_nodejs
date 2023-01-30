const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const User = require("./models/user");

const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRouter = require("./router/adminRouter");
const shopRouter = require("./router/shopRouter");
const errorController = require("./controllers/error.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use(errorController.getError);

app.use((req, res, next) => {
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

mongoose
  .connect(
    "mongodb+srv://korn:Rideon71773@cluster0.v2viw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3000);
    console.log("connected");
  })
  .catch((err) => console.log(err));
