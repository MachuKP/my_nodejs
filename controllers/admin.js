const Product = require("../models/products");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    isEdit: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  });
  product
    .save()
    .then((result) => {
      console.log("product added!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const isEdit = req.query.edit;
  if (!isEdit) {
    return res.redirect("/");
  }
  const prodId = res.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        product: product,
        isEdit: isEdit,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updateTitle = req.body.title;
  const updatePrice = req.body.price;
  const updateImageUrl = req.body.imageUrl;
  const updateDesc = req.body.description;

  Product.findById(prodId)
    .then((product) => {
      product.title = updateTitle;
      product.price = updatePrice;
      product.description = updateDesc;
      product.imageUrl = updateImageUrl;
      return product.save();
    })
    .then((result) => {
      console.log("product update!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    // help to get only need data
    // .select("title price -_id")
    // help to create relative on schema
    // .populate("userId", "name")
    .then((product) => {
      console.log(product);
      res.render("admin/products", {
        pageTitle: "Product List",
        path: "/admin/products",
        prods: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProudct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByIdAndRemove(productId)
    .then(() => {
      console.log("product delete!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
