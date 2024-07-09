const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin registration
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the admin already exists
        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).send({ message: "Admin already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new admin
        admin = new Admin({
            email,
            password: hashedPassword
        });

        await admin.save();

        res.status(201).send({ message: "Admin created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
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
