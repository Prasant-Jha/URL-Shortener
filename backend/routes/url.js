const express = require('express');
const router = express.Router();
const Url = require('../models/Url');


router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) return res.status(400).json('URL is required');

  try {

    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.json(url);
    }

    url = new Url({ originalUrl });
    await url.save();
    return res.json(url);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
});


router.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params; 

    try {
        const url = await Url.findOne({ shortUrl });

        if (url) {
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

  

module.exports = router;
