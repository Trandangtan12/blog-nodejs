const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
    _id: { type: String },
    name: { type: String, maxLeight: 255 },
    description: { type: String, maxLeight: 600 },
    image: { type: String, maxLeight: 255 },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', Course);
