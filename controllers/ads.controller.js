const fs = require('fs');
const Ads = require('../models/advert.model');
const getImageFileType = require('../utils/getImageFileType');


exports.getAll = async (req, res) => {
  try {
    res.json(await Ads.find().populate('user'));
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id).populate('user');
    if (!ad) res.status(404).json({ message: 'Not found' });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { title, content, price, location, user } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if (
      title &&
      content &&
      // date &&
      price &&
      location &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      console.log(req.session)
      const newAd = new Ads({
        title: title,
        content: content,
        date: new Date(),
        price: price,
        location: location,
        image: req.file.filename,
        user: req.session.login._id,
      });
      await newAd.save();
      res.json({ message: 'New Ads' });
    } else {
      console.log (req.file, fileType)
      if (req.file) {
        fs.unlinkSync(`./client/public/uploads/${req.file.filename}`);
      }
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
exports.delete = async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id);
    if (ad) {
      await Ads.deleteOne({ _id: req.params.id });
      res.json(ad);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.edit = async (req, res) => {
  const { title, description, date, price, location } = req.body;

  try {
    const ad = await Ads.findById(req.params.id);
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    if (ad) {
      ad.title = title;
      ad.description = description;
      ad.price = price;
      ad.date = date;
      ad.location = location;
      if (
        req.file &&
        ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
      ) {
        ad.image = req.file.filename;
      }
      const updatedAd = await ad.save();
      res.json(updatedAd);
    } else {
      if (req.file) {
        fs.unlinkSync(`./client/public/uploads/${req.file.filename}`);
      }

      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(`./client/public/uploads/${req.file.filename}`);
    }
    res.status(500).json({ message: err });
  }
};

exports.searchPhrase = async (req, res, next) => {
  const { searchPhrase } = req.params;
  try {
    const ad = await Ads.find({ $text: { $search: searchPhrase } });
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};