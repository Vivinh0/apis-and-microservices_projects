"use strict";

const router = require("express").Router();

router
  .get("/1451001600000", (req, res) => {
    // res.json({ msg: "Ok" });
    const date = 1451001600000;
    // Date turn milliseconds
    const inputDate = new Date(date);
    const dateInUTC = inputDate.toUTCString();
    const response = { unix: date, utc: dateInUTC };
    res.json(response);
  })
  .get(
    "/:date",
    // Middleware checks if input date is invalid
    (req, res, next) => {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
      if (Date.parse(req.params.date)) {
        next();
      } else {
        res.json({ error: "Invalid Date" });
      }
    },
    (req, res, next) => {
      //   res.json({ msg: "Ok" });
      const inputDate = new Date(req.params.date);
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
      const dateInMilliseconds = inputDate.getTime();
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString
      const dateInUTC = inputDate.toUTCString();
      const response = { unix: dateInMilliseconds, utc: dateInUTC };
      res.json(response);
    }
  );

module.exports = router;
