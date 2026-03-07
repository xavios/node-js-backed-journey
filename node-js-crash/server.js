import http from "http";
const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  res.writeHead(500, { "Content-Type": "text/html" });
  res.end(`
    <html>
        <body>
            <center>
                <h1>Hello from the Node.js environment</h1>
            </center>
        </body>
    </html>`);
});

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
