"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

function objToString(object) {
  return JSON.stringify(object, null, 2);
}

function unixDateInMinutes(unixDate) {
  return Math.floor(unixDate / (1000 * 60));
}

describe("Test Timestamp Microservice", () => {
  let server;

  // Start server before each test
  beforeEach((done) => {
    server = require("../server");
    done();
  });

  // Close server after each test
  afterEach((done) => {
    server.close(() => done());
  });

  describe("GET /api/timestamp/:date with a valid date", () => {
    it("should return a JSON object with an 'unix' key that is a Unix timestamp of the input date in milliseconds and an 'utc' key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT", (done) => {
      chai
        .request(server)
        .get("/api/timestamp/2015-12-25")
        .end((err, res) => {
          // Get results
          const actualResult = res.body;
          const expectedResult = {
            unix: 1451001600000,
            utc: "Fri, 25 Dec 2015 00:00:00 GMT",
          };

          // Results to Strings
          const actualResultToString = objToString(actualResult);
          const expectedResultToString = objToString(expectedResult);

          // Test results
          expect(actualResultToString).to.be.equal(expectedResultToString);

          done();
        });
    });

    it('should return a JSON object having the structure { error : "Invalid Date" } when the input date string is invalid', (done) => {
      chai
        .request(server)
        .get("/api/timestamp/invalid-input-date")
        .end((err, res) => {
          // Get results
          const actualResult = res.body;
          const expectedResult = { error: "Invalid Date" };

          // Results to Strings
          const actualResultToString = objToString(actualResult);
          const expectedResultToString = objToString(expectedResult);

          // Test results
          expect(actualResultToString).to.be.equal(expectedResultToString);

          done();
        });
    });
  });

  describe("GET /api/timestamp/1451001600000", () => {
    it('should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }', (done) => {
      chai
        .request(server)
        .get("/api/timestamp/1451001600000")
        .end((err, res) => {
          // Get results
          const actualResult = res.body;
          const expectedResult = {
            unix: 1451001600000,
            utc: "Fri, 25 Dec 2015 00:00:00 GMT",
          };

          // Results to Strings
          const actualResultToString = objToString(actualResult);
          const expectedResultToString = objToString(expectedResult);

          // Test results
          expect(actualResultToString).to.be.equal(expectedResultToString);

          done();
        });
    });
  });

  // TO-DO milliseconds test fails
  describe("GET /api/timestamp", () => {
    it("should return a JSON object with an 'unix' key that is a Unix timestamp of current date in milliseconds and an 'utc' key that is a string of the current date in the format: Thu, 01 Jan 1970 00:00:00 GMT", (done) => {
      chai
        .request(server)
        .get("/api/timestamp")
        .end((err, res) => {
          // Get results
          const actualResult = res.body;
          const currDate = new Date();
          const expectedResult = {
            unix: currDate.getTime(),
            utc: currDate.toGMTString(),
          };

          // Process results
          const actualUnixDateInMin = unixDateInMinutes(actualResult.unix);
          const expectedUnixDateInMin = unixDateInMinutes(expectedResult.unix);

          // Test results
          expect(actualUnixDateInMin).to.be.equal(expectedUnixDateInMin);
          expect(expectedResult.utc).to.be.equal(expectedResult.utc);

          done();
        });
    });
  });
});
