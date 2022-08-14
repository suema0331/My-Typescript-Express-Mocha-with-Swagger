import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
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

if (app.get("env") === "development") {
  // Swagger
  const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Express & TypeScript Evaluation",
        version: "1.0.0",
        description:
          "calculate some statistics from given input data about political speeches",
      },
    },
    apis: ["./src/router/**/*.ts"],
  };
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJSDoc(options), { explorer: true })
  );
}

// API server start
app.listen(3000, () => {
  console.log("listening on port 3000!");
});
