const Products = require("../data/products.json");
const { v4: uuidv4 } = require("uuid");
const { saveData } = require("../helpers/helper");
//@_description return a promise with all products
function getAllProducts() {
  return new Promise((resolve, reject) => {
    resolve(Products);
  });
}

//@_description return a promise with the product filtered by id

function getProduct(id) {
  return new Promise((resolve, reject) => {
    const product = Products.find((p) => p.id === id);
    resolve(product);
  });
}

//@_description add the new product to database
function saveProduct(product) {
  return new Promise(async (resolve, reject) => {
    try {
      const newProduct = { id: uuidv4(), ...product };
      Products.push(newProduct);
      saveData("./data/products.json", Products);
      resolve(newProduct);
    } catch (err) {
      console.log(err);
    }
  });
}

//@_description update product

function updateProduct(product) {
  return new Promise((resolve, reject) => {
    try {
      const index = Products.findIndex((p) => p.id === product.id);
      Products[index] = product;
      saveData("./data/products.json", Products);
      resolve(Products[index]);
    } catch (err) {
      console.log(err);
    }
  });
}
//@_description delete product by index

function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    try {
      const produts = Products.filter((p) => p.id != id);
      saveData("./data/products.json", produts);
      resolve(id);
    } catch (err) {
      console.log(err);
    }
  });
}
module.exports = {
  getAllProducts,
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
};
