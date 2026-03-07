import http from "http";
const PORT = process.env.PORT;

const recipeDetailsUrlRegex =
  /^\/recipes\/..\-..\/details\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gm;

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (method !== "GET") {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "server error" }));
    return;
  }

  switch (url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<h1>Recipes Home Page</h1>`);
      break;

    case "/recipes":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<h1>Recipes HUB Page</h1>`);
      break;

    default:
      if (url.match(recipeDetailsUrlRegex)) {
        const recipeUUIDIdx = url.lastIndexOf("/");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(
          `<h1>Recipes Details Page</h1><h2>${url.substring(recipeUUIDIdx + 1)}</h2>`
        );
        return;
      }
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(`not found`);
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
