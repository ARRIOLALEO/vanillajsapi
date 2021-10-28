const http = require("http");
const {
  showAllProducts,
  getProductById,
  createNewProduct,
  updateProductById,
  deleteProductById,
} = require("./controlers/controlerProduct");

const server = http.createServer((req, res) => {
  //@description endPoints for Products
  //@route api/poducts

  if (req.url === "/api/products" && req.method === "GET") {
    showAllProducts(res);
  } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getProductById(res, id);
  } else if (req.url === "/api/products" && req.method === "POST") {
    createNewProduct(req, res);
  } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateProductById(req, res, id);
  } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deleteProductById(res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not Found" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`im listening from the port ${PORT}`);
});
