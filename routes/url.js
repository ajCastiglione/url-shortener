const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortId = require("shortid");
const config = require("config");

const Url = require("../models/Urls");

// @route POST /api/url/shorten
// @desc create short URL

router.post("/shorten", async (req, res) => {
  let { longUrl } = req.body;
  let baseUrl = config.get("baseUrl");

  //   Validate base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(400).send("Invalid base url");
  }

  //   Create url code
  let urlCode = shortId.generate();

  //   Check longUrl
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        let shortUrl = `${baseUrl}/${urlCode}`;

        url = new Url({
          urlCode,
          longUrl,
          shortUrl,
          date: new Date()
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server error");
    }
  } else {
    res.status(400).json("Invalid long url");
  }
});

module.exports = router;
