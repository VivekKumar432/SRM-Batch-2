const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Add any other fields you need for admin
});

module.exports = mongoose.model('Admin', adminSchema);
