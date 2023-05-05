const Product = require('../model/product.model');

// add Product function
const addProduct = async (req, res) => {
  const {
    sku,
    quantity,
    productName,
    imgUrl,
    productDescription,
    isFavourite,
    price,
  } = req.body.product;
  console.log(req.body.product);

  const product = new Product({
    sku,
    quantity,
    productName,
    imgUrl,
    productDescription,
    isFavourite,
    price,
  });

  await product
    .save()
    .then(() => res.json('product created!' + product))
    .catch((err) => {
      console.log(err);
      res.status(400).json('Error (create): ' + err)
    });

};

// update Product function
const updateProduct = async (req, res) => {
  Product.findByIdAndUpdate(req.params.id)
    .then((existingProduct) => {
      existingProduct.sku = req.body.sku;
      existingProduct.quantity = req.body.quantity;
      existingProduct.productName = req.body.productName;
      existingProduct.imgUrl = req.body.imgUrl;
      existingProduct.productDescription = req.body.productDescription;
      existingProduct.isFavourite = req.body.isFavourite;
      existingProduct.price = req.body.price;

      existingProduct
        .save()
        .then((updatedProduct) => res.json({ updatedProduct }))
        .catch((error) => res.status(400).json('Error:' + error));
    })
    .catch((error) => res.status(400).json('Error (update): ' + error));
};

// delete Product function
const deleteProduct = async (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json(`Product deleted - ${req.params.id}`))
    .catch((err) => res.status(400).json('Error (delete): ' + err));
};

// get  Product function by id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else {
      res.json('No product from this ID');
    }
  } catch (error) {
    res.status(500).send('Server Error : ' + error);
  }
};

// get all Product function
const getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    res.status(500).send('Server Error (getAll): ' + error);
  }
};

//export
module.exports = {
  addProduct,
  getProductById,
  deleteProduct,
  getProduct,
  updateProduct,
};
