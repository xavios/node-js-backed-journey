import { createServer } from "http";
const PORT = process.env.PORT;

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "Johnny Doe" },
];

const loggerMiddleware = (req, res, next) => {
  process.stdout.write(`${req.method} ${req.url}`);
  next();
  process.stdout.write(` - ${res.statusCode}\n`);
};

const server = createServer((req, res) => {
  loggerMiddleware(req, res, () => {
    const { url, method } = req;
    res.statusCode = 200;
    res.setHeader("content-type", "application/json");
    if (url === "/api/users" && method === "GET") {
      res.write(JSON.stringify(users));
    } else if (url.match(/\/api\/users\/[0-9]+$/) && method === "GET") {
      const id = url.split("/")[3];
      const user = users.find((user) => user.id === parseInt(id));

      if (user) {
        res.write(JSON.stringify(user));
      } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: "user not found" }));
      }
    } else {
      res.statusCode = 404;
      res.write(JSON.stringify({ message: "route not found" }));
    }
    res.end();
  });
});

server.listen(PORT, () => {
  console.log(`API server is listening on the ${PORT} port `);
});
