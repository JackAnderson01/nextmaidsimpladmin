const express = require("express");
const next = require("next");
const compression = require("compression");
// const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Use compression middleware
  server.use(compression());

  // Other middleware and routes...

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  // app.use(cors());

  const port = process.env.PORT || 5000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${port}`);
  });
});
