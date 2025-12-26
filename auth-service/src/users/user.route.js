const express = require("express");
const User = require("./user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// 1. LOGIN (With logic to handle BOTH Plain Text and Hashed passwords)
router.post("/admin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await User.findOne({ username });

        // Debugging
        console.log("Attempting login for:", username);

        if (!admin) {
            return res.status(401).send({ message: "Admin not found!" });
        }

        // Check 1: Try matching with Bcrypt (The secure way)
        let isPasswordValid = await bcrypt.compare(password, admin.password);

        // Check 2: If Bcrypt failed, check if it's a Plain Text password (The old way)
        if (!isPasswordValid) {
            if (password === admin.password) {
                console.log("Plain text password matched! Upgrading to hash...");
                isPasswordValid = true;

                // --- CRITICAL FIX ---
                // Do NOT hash the password here manually. 
                // The User Model already does it in userSchema.pre('save').
                // We just mark it as modified so the Model knows to run the hashing logic.
                admin.markModified('password'); 
                await admin.save(); 
            }
        }
        
        // If BOTH checks failed
        if (!isPasswordValid) {
            console.log("Password did not match");
            return res.status(401).send({ message: "Invalid password!" });
        }

        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: "Authentication Successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        console.error("Failed to login as admin", error);
        res.status(401).send({ message: "Failed to login as admin" });
    }
});

// 2. REGISTER NEW ADMIN
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const existingAdmin = await User.findOne({ username });
        if(existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const user = new User({ 
            username, 
            password, 
            role: 'admin' 
        });
        
        // This .save() triggers the pre('save') hook in the model, hashing the password automatically
        await user.save();
        
        res.status(201).json({ message: "Admin registered successfully", user });
    } catch (error) {
        console.error("Error registering admin", error);
        res.status(500).json({ message: "Registration failed" });
    }
});

// 3. GET ALL ADMINS
router.get("/", async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users", error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
});

// 4. DELETE ADMIN
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        console.error("Error deleting user", error);
        res.status(500).json({ message: "Failed to delete user" });
    }
});

// 5. UPDATE USER (Username, Password, Role)
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { role, username, password } = req.body;
        
        // Find the user first
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update fields if they are provided
        if (role) user.role = role;
        if (username) user.username = username;
        if (password) {
            // Setting the password directly. 
            // The pre('save') hook in user.model.js will detect this change and hash it automatically.
            user.password = password; 
        }

        await user.save(); // This triggers the hashing logic if password changed
        
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("Error updating user", error);
        res.status(500).json({ message: "Failed to update user" });
    }
});

module.exports = router;