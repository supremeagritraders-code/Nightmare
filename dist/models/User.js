import mongoose, { Schema } from 'mongoose';
import bcryptjs from 'bcryptjs';
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    balance: {
        type: Number,
        default: 0,
        min: [0, 'Balance cannot be negative']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    try {
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt);
        next();
    }
    catch (error) {
        next(error);
    }
});
// Compare password method
userSchema.methods.comparePassword = async function (password) {
    return bcryptjs.compare(password, this.password);
};
export const User = mongoose.model('User', userSchema);
