const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

// HTTP Logger
app.use(morgan("combined"));

// Teamplate handle engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "resources/views"));

app.get("/", (req, res) => {
  return res.render("home");
});

app.get("/news", (req, res) => {
  return res.render("news");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
