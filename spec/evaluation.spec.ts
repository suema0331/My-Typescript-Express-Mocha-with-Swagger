import { expect } from "chai";
import "mocha";

import { fetchCsv, parseDataFromCsv } from "../src/functions/getData";
import {
  analizeMostSpeeches,
  analizeMostSecurity,
  analizeLeastWordy,
} from "../src/functions/analize";
import { Speech } from "../src/functions/getData";

import path from "path";
const appRoot = path.resolve("./");

let speeches: Speech[] = [];

describe("evaluation test", () => {
  // describe("should", () => {
  //   it("always pass", () => {
  //     expect(true).to.equal(true);
  //   });
  // });

  describe("fetchCsv from the given path", () => {
    it("should analize most speeches", (done) => {
      fetchCsv(
        "http://localhost:3001/static/csv/text1.csv",
        appRoot + "/spec/data/text1.csv"
      )
        .then((res: any) => {
          console.log(res);
          console.log(res.length);
          expect(res.length).to.equal(9);
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });

  describe("parse Data From the given Csv", () => {
    it("should  parse data from Csv", async () => {
      speeches = await parseDataFromCsv(appRoot + "/spec/input/text1.csv");
      console.log(`Read data: ${speeches.length} lines`);

      expect(speeches.length).to.equal(9);
    });
  });

  describe("analizeMostSpeeches in 2012", () => {
    it("should analize most speeches", () => {
      const mostSpeeches = analizeMostSpeeches(speeches, "2012");
      console.log(`Answer1: ${mostSpeeches}`);

      expect(mostSpeeches).to.equal(null);
    });
  });

  describe("analizeMostSecurity", () => {
    it("should analize most speeches about Internal Security", () => {
      const mostSecurity = analizeMostSecurity(speeches, "Internal Security");
      console.log(`Answer2: ${mostSecurity}`);

      expect(mostSecurity).to.equal("Caesare Collins");
    });
  });

  describe("analizeLeastWordy", () => {
    it("should analize most least words", () => {
      const leastWordy = analizeLeastWordy(speeches);
      console.log(`Answer3: ${leastWordy}`);

      expect(leastWordy).to.equal("Caesare Collins");
    });
  });
});
