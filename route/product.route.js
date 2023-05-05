const express = require("express");
const router = express.Router();

const {
    addProduct,
    getProductById,
    deleteProduct,
    getProduct,
    updateProduct,
} = require("../controller/Product.controller");

//@route  POST Product
//@desc   add Product
router.post("/add", addProduct);

//@route  GET Product
//@desc   get Product by Id
router.get("/:id", getProductById);

//@route  DELETE Product
//@desc   delete Product
router.delete("/:id", deleteProduct);

//@route  GET Product/all
//@desc   get all Products
router.get("/", getProduct);

//@route  PUT Product
//@desc   update Product
router.put("/:id", updateProduct);


module.exports = router;

