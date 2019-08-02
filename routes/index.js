const express = require("express");
const router = express.Router();

const Url = require("../models/Urls");

// @route GET /:code
// @desc Redirect to long/original url

router.get("/:code", async (req, res) => {
  try {
    let url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No URL was found.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Uh oh, something happened with the server!");
  }
});

module.exports = router;
