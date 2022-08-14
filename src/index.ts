import express from "express";
import evaluation from "./router/evaluation";

const app: express.Express = express();

// cors
app.use((_, res, next) => {
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
// TODO separate server to main application clean
// focus on only reading and evaluating

// GET /evaluation
app.use("/evaluation", evaluation);

// API server start
app.listen(3000, () => {
  console.log("listening on port 3000!");
});
