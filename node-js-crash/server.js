import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Hello World!</h1>");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
