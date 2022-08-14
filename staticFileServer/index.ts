import express from "express";

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
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// host test input data
app.use("/static", express.static("staticFileServer/input"));

// API server start
app.listen(3001, () => {
  console.log("listening on port 3001!");
});
