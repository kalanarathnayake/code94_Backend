const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    sku: { type: String, required: true },
    quantity: { type: String, required: true },
    productName: { type: String, required: true },
    imgUrl: { type: String, required: true },
    productDescription: { type: String, required: true },
    isFavourite: { type: Boolean, required: true },
    price: { type: String, required: true },

}, {
    timestamps: true,
})

module.exports = Product = mongoose.model("Products", productSchema);