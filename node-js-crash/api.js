import { createServer } from "http";
const PORT = process.env.PORT;

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "Johnny Doe" },
];

const loggerMiddleware = (req, res, next) => {
  process.stdout.write(`${new Date()} - ${req.method} ${req.url}`);
  next();
  process.stdout.write(
    `\t\t\t ${res.statusCode} (${res.getHeader("content-type")})\n`,
  );
};

const jsonMiddleware = (_, res, next) => {
  res.setHeader("content-type", "application/json");
  next();
};

const allUsersHandler = (_, res) => {
  res.statusCode = 200;
  res.end(JSON.stringify(users));
};

const userHandle = (_, res, user) => {
  res.statusCode = 200;
  res.end(JSON.stringify(user));
};

const userNotFoundHandle = (_, res) => {
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "user not found" }));
};

const pathNotFoundHandler = (_, res) => {
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "route not found" }));
};

const HttpMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  OPTIONS: "OPTIONS",
  HEAD: "HEAD",
};

const server = createServer((req, res) => {
  loggerMiddleware(req, res, () => {
    jsonMiddleware(req, res, () => {
      const { url, method } = req;
      if (url === "/api/users" && method === HttpMethod.GET) {
        return allUsersHandler(req, res);
      } else if (
        url.match(/\/api\/users\/[0-9]+$/) &&
        method === HttpMethod.GET
      ) {
        const id = url.split("/")[3];
        const user = users.find((user) => user.id === parseInt(id));
        if (user) {
          return userHandle(req, res, user);
        } else {
          return userNotFoundHandle(req, res);
        }
      } else {
        return pathNotFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`API server is listening on the ${PORT} port `);
});
