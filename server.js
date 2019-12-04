const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();
// server.use(helmet());

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`);
  // res.send(" all good");
  next();
}

function gatekeeper(req, res, next) {
  if (req.originalUrl == "/mellon") next();
  else res.status(401).send("Faild to pass");
}

server.use(express.json());
server.use("/api/hubs", hubsRouter);
server.use(logger);
server.use(gatekeeper);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.get("/echo", (req, res) => {
  res.send(req.headers);
});
server.get("/area51", helmet(), (req, res) => {
  res.send(req.headers);
});

server.get("/mellon", (req, res) => {
  res.send("Wellcome Home");
});

module.exports = server;
