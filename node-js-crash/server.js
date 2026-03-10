import http from "http";
const PORT = process.env.PORT;
import fs from "fs/promises";
import path from "path";
import url from "url";

const __fileName = url.fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const recipeDetailsUrlRegex =
  /^\/recipes\/..\-..\/details\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gm;

const server = http.createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;
  if (method !== "GET") {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "server error" }));
    return;
  }

  switch (url) {
    case "/":
      await loadPage(res, "index.html");
      break;

    case "/recipes":
      await loadPage(res, "hub.html");
      break;

    default:
      if (url.match(recipeDetailsUrlRegex)) {
        const recipeUUIDIdx = url.lastIndexOf("/");
        const recipeUUID = url.substring(recipeUUIDIdx + 1);
        let buffer = await fs.readFile(
          path.join(__dirName, "public", "recipe-details.html")
        );
        let content = buffer.toString();
        content = content.replace("{{ RECIPE_UUID }}", recipeUUID);

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
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

async function loadPage(res, fileName) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(await fs.readFile(path.join(__dirName, "public", fileName)));
}
