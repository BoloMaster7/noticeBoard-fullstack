const Ads = require('../models/advert.model');

exports.getAllAds = async (req, res) => {
  try {
    res.json(await Ads.find({}));
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getAdsById = async (req, res) => {

  try {
    const ads = await Ads.findById(req.params.id);
    if (!ads) res.status(404).json({ message: 'Not found' });
    else res.json(ads);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createAds = async (req, res) => {
  try {

    const {title, content, pubDate, image, price, location, userInfo } = req.body;
    const newAds = new Ads({ title, content, pubDate,image, price, location, userInfo});
    await newAds.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }

};

exports.updateAds = async (req, res) => {
  try {
    const ads = await Ads.findById(req.params.id);
    if (!ads) res.status(404).json({ message: 'Not found' });
    else {
      ads.title = req.body.title,
      ads.content = req.body.content,
      ads.pubDate = req.body.pubDate,
      ads.image = req.body.image,
      ads.price = req.body.price,
      ads.location = req.body.location,
      ads.userInfo= req.body.userInfo,
      await ads.save();
      res.json(ads);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteAds = async (req, res) => {
  try {
    const ads = await Ads.findById(req.params.id);
    if (!ads) res.status(404).json({ message: 'Not found' });
    else {
      await ads.remove();
      res.json({ message: 'Ads deleted' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};


/////////////search, need to add later