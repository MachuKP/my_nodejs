const mongodb = require("mongodb");
const getDb = require("../util/database");

module.exports = class Product {
  constructor(title, imageUrl, description, price, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let saveItem;
    if (this._id) {
      saveItem = db
        .collection("products")
        .updateOne({ _id: this.id }, { $set: this });
    } else {
      saveItem = db.collection("products").insertOne(this);
    }
    return saveItem
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        throw err;
      });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("products")
      .findOne({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => {
        return err;
      });
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteById({ _id: new mongodb.ObjectId(id) })
      .then((product) => {
        return product;
      })
      .catch((err) => {
        return err;
      });
  }
};
