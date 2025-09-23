const http = require("http");
// const { create } = require("./asdajsd");

// create();

const server = http.createServer((req, res) => {
  if (req.url == "/" && req.method == "GET") {
    res.end("<h1> Hellow </h1>");
  }
  if (req.url == "/about" && req.method == "GET") {
    res.end("Hello world welcome to about");
  }
  if (req.url == "/home" && req.method == "GET") {
    res.end("Hello world welcome to home");
  }
});

server.listen(3001, () => {
  console.log("server is running at " + 3000);
});
