import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(500, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "server error" }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
