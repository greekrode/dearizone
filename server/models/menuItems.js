const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    id: String,
    name: String,
    imageUrl: String,
    message: String,
    password: String,
    created: { type: Date, default: Date.now }
})

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = { MenuItem };