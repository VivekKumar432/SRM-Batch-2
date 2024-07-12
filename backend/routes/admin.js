const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin registration
router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ email, password: hashedPassword });
        await admin.save();
        res.status(201).send('Admin registered successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Admin login
router.post("/auth", async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin || !await bcrypt.compare(password, admin.password)) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWTPRIVATEKEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Add other admin-specific routes here

module.exports = router;
