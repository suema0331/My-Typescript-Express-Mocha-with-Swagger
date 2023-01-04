import express, { Request, Response } from "express";
import path from "path";
const appRoot = path.resolve("./");

import { fetchCsv, parseDataFromCsv } from "../functions/getData";
import {
  analizeMostSpeeches,
  analizeMostSecurity,
  analizeLeastWordy,
} from "../functions/analize";
import { Speech } from "../functions/getData";

type Answer = {
  mostSpeeches: string | null;
  mostSecurity: string | null;
  leastWordy: string | null;
};

interface UrlRequest extends Request {
  query: {
    url: string[];
  };
}

const router: express.Router = express.Router();

/**
 * @swagger
 * openapi: 3.0.3
 * info:
 *   title: Political Speeches
 *   description: The goal of this exercise is to calculate some statistics from given input data about political speeches.
 *   termsOfService: http://swagger.io/terms/
 *   license:
 *     name: Apache 2.0
 *     url: http://www.apache.org/licenses/LICENSE-2.0.html
 *   version: 1.0.0
 * servers:
 *   - url: http://localhost:3000
 * tags:
 *   - name: evaluation
 *     description: Calculate some statistics
 * paths:
 *   /evaluation:
 *     get:
 *       tags:
 *         - evaluation
 *       summary: Calculate some statistics from given input data URL in query parameters
 *       description: Multiple URLs can be provided (http and https) via query parameters at the path.
 *       operationId: evaluation
 *       parameters:
 *         - name: url
 *           in: query
 *           description: input data URLs
 *           required: true
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *       responses:
 *         '200':
 *           description: Returns answers of political questions
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 items:
 *                   $ref: '#/components/schemas/Answer'
 *
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       properties:
 *         mostSpeeches:
 *           type: string
 *           example: 'Caesare Collins'
 *         mostSecurity:
 *           type: string
 *           example: 'Caesare Collins'
 *         leastWordy:
 *           type: string
 *           example: 'Caesare Collins'
 */

router.get("/", async (req: UrlRequest, res: Response) => {
  console.log("#####################");
  console.log("Evaluation start!");
  let urls = req.query.url;
  console.log(`Receiced urls: ${req.query.url}`);

  if (typeof urls === "string") {
    urls = new Array(urls);
  }

  let resJsons: Answer[] = [];

  for (const url of urls) {
    console.log("=====================");
    const sourcePath = url;
    console.log("Source file URL: " + sourcePath);

    const fileName = url.split("/");
    if (!fileName || fileName.length === 0) return;
    const outputPath = appRoot + "/data/" + fileName[fileName.length - 1];
    console.log("Output file URL: " + outputPath);

    // Download file
    await fetchCsv(sourcePath, outputPath);

    const speeches: Speech[] = await parseDataFromCsv(outputPath);
    // console.log(speeches); // for debug
    console.log(`Read data: ${speeches.length} lines`);

    console.log("---------------------");
    const mostSpeeches = analizeMostSpeeches(speeches, "2013");
    console.log(`Answer1: ${mostSpeeches}`);

    console.log("---------------------");
    const mostSecurity = analizeMostSecurity(speeches, "Internal Security");
    console.log(`Answer2: ${mostSecurity}`);

    console.log("---------------------");
    const leastWordy = analizeLeastWordy(speeches);
    console.log(`Answer3: ${leastWordy}`);

    const resJson = {
      mostSpeeches,
      mostSecurity,
      leastWordy,
    };
    console.log(resJson);
    resJsons.push(resJson);
  }
  res.json(resJsons);
});

export default router;
