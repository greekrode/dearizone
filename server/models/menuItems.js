const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    message: String,
    created: { type: Date, default: Date.now }
})

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = { MenuItem };