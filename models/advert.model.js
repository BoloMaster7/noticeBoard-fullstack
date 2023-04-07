const mongoose = require('mongoose');

const advertSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    pubDate: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    userInfo :{ type: String, required: true },
});

module.exports = mongoose.model('Advert', advertSchema);