import fs from "fs";
import http from "http";
// import https from "https";
import * as csv from "csv-parse";
import { parse } from "csv-parse/sync";
import { createObjectCsvWriter } from "csv-writer";

export interface Speech {
  Speaker: string;
  Topic: string;
  Date: string;
  Words: string;
}

// 0. feth CSV
export function fetchCsv(sourcePath: string, outputPath: string) {
  const speeches: Speech[] = [];
  return new Promise((resolve, reject) => {
    http
      .request(sourcePath, (resHttp: any) => {
        resHttp
          .pipe(
            csv.parse({
              trim: true,
              columns: true,
              delimiter: ",",
              skip_empty_lines: true,
            })
          )
          .on("data", (data: any) => {
            speeches.push(data);
          })
          .on("error", (err: any) => {
            console.log(err);
            reject(err);
          })
          .on("end", async () => {
            console.log("🌟Finished to read csv!");
            await downloadCsv(speeches, outputPath);
            resolve(speeches);
          });
      })
      .end();
  });
}

// 1. download Csv
export async function downloadCsv(data: Speech[], outputPath: string) {
  const csvWriter = await createObjectCsvWriter({
    path: outputPath,
    encoding: "utf8",
    header: [
      { id: "Speaker", title: "Speaker" },
      { id: "Topic", title: "Topic" },
      { id: "Date", title: "Date" },
      { id: "Words", title: "Words" },
    ],
    append: false,
  });
  await csvWriter
    .writeRecords(data)
    .then(() => {
      console.log("🌟Finished to write csv!");
    })
    .catch((err: any) => console.log(err));
}

// 2. read and parse data from saved csv
export async function parseDataFromCsv(path: string) {
  let speeches: Speech[] = [];
  try {
    const inputData = fs.readFileSync(path, { encoding: "utf8" });
    const parsedData = await parse(inputData, {
      columns: true,
      trim: true,
    });
    parsedData.forEach((speech: Speech) => {
      speeches.push(speech);
    });
    console.log("🌟Parsed data from csv!");
  } catch (err) {
    console.log(err);
  }
  return speeches;
}
