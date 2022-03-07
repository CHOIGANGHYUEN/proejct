const express = require("express");
const db = require("../config/db");
const router = express();

router.get("/area", (req, res) => {
  db.query(
    "SELECT ImgUrl,username,like_cnt,fname,sname FROM Upload Order By like_cnt DESC LIMIT 3",
    (err, results) => {
      if (!err) {
        res.send({ results });
      } else {
        res.send(err);
      }
    }
  );
});

router.post("/area/renew", (req, res) => {
  const fname = req.body.fname;
  const sname = req.body.sname;

  if (fname === "전체") {
    db.query(
      "SELECT ImgUrl,username,like_cnt FROM Upload Order By like_cnt DESC LIMIT 3",
      (err, results) => {
        if (!err) {
          res.send({ results });
        } else {
          res.send(err);
        }
      }
    );
  } else if (fname !== " " && sname === " ") {
    db.query(
      `SELECT ImgUrl,username,like_cnt FROM Upload where fname = '${fname}' Order By like_cnt DESC LIMIT 3`,
      (err, results) => {
        if (!err) {
          res.send({ results });
        } else {
          res.send(err);
        }
      }
    );
  } else {
    db.query(
      `SELECT ImgUrl,username,like_cnt FROM Upload where sname = '${sname}' Order By like_cnt DESC LIMIT 3`,
      (err, results) => {
        if (!err) {
          res.send({ results });
        } else {
          res.send(err);
        }
      }
    );
  }
});

router.get("/banners", (req, res) => {
  db.query("SELECT ImgUrl FROM banner", (err, results) => {
    if (!err) {
      res.send({ results });
    } else {
      res.send(err);
    }
  });
});

router.get("/location", (req, res) => {
  db.query("select ImgUrl from Location", (err, result) => {
    if (!err) {
      res.send({ result });
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
