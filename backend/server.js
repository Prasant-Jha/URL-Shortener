const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  };
  

app.use(cors(corsOptions));
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/urlShortener')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));


const urlRoute = require('./routes/url');
app.use('/api/url', urlRoute);


app.get('/:shortUrl', async (req, res) => {
  try {
      const Url = require('./models/Url');
      const { shortUrl } = req.params;
      
      const urlData = await Url.findOne({ shortUrl });
      
      if (urlData) {
          return res.redirect(urlData.originalUrl);
      } else {
          return res.status(404).json({ error: 'Short URL not found' });
      }
  } catch (error) {
      console.error('Error redirecting to the original URL:', error);
      res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
