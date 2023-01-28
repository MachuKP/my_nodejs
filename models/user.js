const mongodb = require("mongodb");
const getDb = require("../util/database.js");

const ObjectId = mongodb.ObjectId;

class User {
  constructor(userName, email, cart, id) {
    this.name = userName;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  //create and update
  // addToCart(product) {
  //   const db = getDb();
  //   const cartProductIndex = this.cart.items.findIndex(cartProduct => {
  //     cartProduct.productId.toString() === product._id.toArray();
  //   })
  //   let newQuantity = 1;
  //   const updateCartItems = [...this.cart.items];

  //   if (cartProductIndex >= 0) {

  //   }
  // }

  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(id) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  getCart() {
    const db = getDb();
    const productId = this.cart.items.map((item) => {
      return item.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productId } })
      .toArray()
      .then((product) => {
        return {
          ...productId,
          quantity: this.cart.items.find((item) => {
            return item.productId.toString() === product._id.toString();
          }).quantity,
        };
      });
  }
}

module.exports = User;
