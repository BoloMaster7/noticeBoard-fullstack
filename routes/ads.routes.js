const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const adsController = require('../controllers/ads.controller');
const imageUpload = require('../utils/imageUpload');

const authAndImageMiddleware =(req, res, next)=>
{authMiddleware(req,res, ()=> {
  imageUpload.single('image')(req,res, next)
})}

router.get('/ads', adsController.getAll);
router.get('/ads/:id', adsController.getById);
router.post('/ads',authAndImageMiddleware, adsController.post), 
router.delete('/ads/:id', authMiddleware, adsController.delete);
router.put('/ads/:id', authMiddleware,imageUpload.single('image'),adsController.edit);
router.get('/ads/search/:searchPhrase', adsController.searchPhrase);


module.exports = router;