const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoConnect = require("./config/database");
const User = require("./models/user.js");

const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRouter = require("./router/adminRouter");
const shopRouter = require("./router/shopRouter");
const errorController = require("./controllers/error.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//set dummy user
app.use((req, res, next) => {
  User.findById("63db75d67d4e7caaa258ae2e")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});


app.use("/admin", adminRouter);
app.use(shopRouter);

app.use(errorController.getError);

mongoose.set("strictQuery", true);

mongoose
  .connect(mongoConnect)
  .then((result) => {
    //create dummy user when don't have one
    User.findOne().then((item) => {
      if (!item) {
        const user = new User({
          name: "test",
          email: "test@mail.com",
          cart: {
            items: [],
          },
        }).save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
