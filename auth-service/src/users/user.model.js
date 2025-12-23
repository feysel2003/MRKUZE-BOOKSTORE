const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    }
});

// FIX: Removed 'next'. 
// When using async, you don't need next(). Mongoose handles it automatically.
userSchema.pre('save', async function() {
    // If password is not modified, do not hash it again
    if (!this.isModified('password')) return;

    // Hash the password (this happens automatically when .save() is called)
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);
module.exports = User;