const file = require("fs");

//@_description this function retrive the data from the body of header

function getDataFrombody(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (err) {
      console.log(err);
    }
  });
}
//@_description function that write data

function saveData(route, data) {
  file.writeFileSync(route, JSON.stringify(data), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}
module.exports = {
  getDataFrombody,
  saveData,
};
