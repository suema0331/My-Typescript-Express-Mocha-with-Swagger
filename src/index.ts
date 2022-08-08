import express from "express";

const app: express.Express = express();

// cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// get data from client
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// host test input data
app.use("/static", express.static("input"));

// GET /evaluation
app.use("/evaluation", require("./router/evaluation.ts"));

// API server start
app.listen(3000, () => {
  console.log("listening on port 3000!");
});
