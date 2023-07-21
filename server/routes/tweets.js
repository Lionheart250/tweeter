"use strict";

const userHelper = require("../lib/util/user-helper");
const express = require('express');
const tweetsRoutes = express.Router();

module.exports = function (DataHelpers) {

  tweetsRoutes.get("/", function (req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function (req, res) {
    if (!req.body || !req.body.text) {
      res.status(400).json({ error: 'Invalid request: no data in POST body or missing "text" field' });
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // Send the newly created tweet back to the client
        res.status(201).json(tweet);
      }
    });
  });

  return tweetsRoutes;

}
