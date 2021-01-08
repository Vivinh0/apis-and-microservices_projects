"use strict";

const router = require("express").Router();

router.get("/:date", (req, res, next) => {
  //   res.json({ msg: "OK" });
  const inputDate = new Date(req.params.date);
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
  const dateInMiliseconds = inputDate.getTime();
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString
  const dateInUTC = inputDate.toUTCString();
  const response = { unix: dateInMiliseconds, utc: dateInUTC };
  res.json(response);
});

module.exports = router;
