const fs = require("fs");
const path = require("path");
const headers = require("./cors");
const multipart = require("./multipartUtils");
const messageQueue = require("./messageQueue");
var formidable = require("formidable");
const qs = require("querystring");
// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join(".", "background.jpg");
////////////////////////////////////////////////////////

// let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = () => {}) => {
  if (req.url !== "/que") {
    console.log("Serving request type " + req.method + " for url " + req.url);
  }
  res.writeHead(200, headers);

  if (req.url === "/") {
    res.write("yes");
  }
  if (req.url === "/que") {
    res.write(`${messageQueue.dequeue()}`);
  }
  if (req.url === "/background.jpg") {
    if (req.method === "GET") {
      let buffer = fs.readFileSync(module.exports.backgroundImageFile);
      res.writeHead(200, { "Content-type": "image/jpeg" });
      res.write(buffer, "binary");
    }
    if (req.method === "POST") {
      let buffed = Buffer.alloc(0);
      req.on("data", (chunk) => {
        buffed = Buffer.concat([buffed, chunk]);
      });

      req.on("end", () => {
        console.log(buffed);
        let file = multipart.getFile(buffed);
        fs.writeFile(
          module.exports.backgroundImageFile,
          file.data,
          (data, error) => {
            if (error) {
              console.log("hellp");
            }
          }
        );
      });
    }
  }

  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
