const {
  getAllProducts,
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
} = require("../models/modelProduct");
const { getDataFrombody } = require("../helpers/helper");
//@_description function to show all products
//@_route /api/products
//@_method GET
async function showAllProducts(res) {
  const allProducts = await getAllProducts();
  if (allProducts.length === 0) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "The data base is empty" }));
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(allProducts));
  }
}

//@_description function filter and show a product by if
//@_route /api/products/id the id is numerical
//@_method = GET
async function getProductById(res, id) {
  const product = await getProduct(id);
  if (!product) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: `The product with the id ${id} was not foundi` }));
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(product));
  }
}

//@_description function that insert a new product to our database
//the data is inside the body (req) retrived data need to be parse is arriving as string
//@_route /api/products
//@_method POST
//@_helper we have a function that retrive information from the body
async function createNewProduct(req, res) {
  const body = await getDataFrombody(req);
  const { name, description, price } = JSON.parse(body);
  const product = {
    name,
    description,
    price,
  };
  const newProduct = await saveProduct(product);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newProduct));
}
//@_description update a product by inside
//@_route /api/products/id id is numerical
//@_method PUT
//@_helper return the data from the body
async function updateProductById(req, res, id) {
  const product = await getProduct(id);
  if (product) {
    const body = await getDataFrombody(req);
    const { name, description, price } = JSON.parse(body);
    const newProduct = {
      id,
      name: name || product.name,
      description: description || product.description,
      price: price || product.price,
    };
    const updatedProduct = await updateProduct(newProduct);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedProduct));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: `the prin our data base` }));
  }
}

//@_description delete a prodcut by inside
//@_route /api/products/id the id is numerical
//@_method DELETE
//@_helper find if product exits

async function deleteProductById(res, id) {
  const product = await getProduct(id);
  if (product) {
    const deletei = await deleteProduct(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: `the product with the id ${id} was deleted ` }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: `the product with the id ${id} was not found` }));
  }
}
module.exports = {
  showAllProducts,
  getProductById,
  createNewProduct,
  updateProductById,
  deleteProductById,
};
