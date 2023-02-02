const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quatity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return product._id.toString() === cp.productId.toString();
  })
  let newQuantity = 1;
  const updatedCartItem = [...this.cart.items];

  if(cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quatity + 1;
    updatedCartItem[cartProductIndex].quatity = newQuantity;
  } else {
    updatedCartItem.push({
      productId: product._id,
      quantity: newQuantity
    })
  }
  const updatedCart = {
    items: updatedCartItem
  }
  this.cart = updatedCart;
  return this.save();
}

module.exports = mongoose.model("User", userSchema);
