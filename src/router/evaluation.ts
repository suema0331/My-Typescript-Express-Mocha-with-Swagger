import express, { Request, Response } from "express";
const path = require("path");
const appRoot = path.resolve("./");
const { fetchCsv, parseDataFromCsv } = require("../functions/getData");
const {
  analizeMostSpeeches,
  analizeMostSecurity,
  analizeLeastWordy,
} = require("../functions/analize");
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
    const mostSpeeches = analizeMostSpeeches(speeches, "2012");
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

module.exports = router;
