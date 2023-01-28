const Product = require("../models/products");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(
    title,
    imageUrl,
    description,
    price, 
  );
  product
    .save()
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })
  res.redirect("/");
};
