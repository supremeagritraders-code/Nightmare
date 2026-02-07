import mongoose, { Schema } from 'mongoose';
const WalletSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: 0,
        min: 0,
    },
    currency: {
        type: String,
        default: 'USD',
        enum: ['USD', 'EUR', 'GBP', 'INR', 'BTC', 'ETH'],
    },
    depositHistory: [
        {
            amount: Number,
            method: String, // 'stripe', 'paypal', 'crypto', 'bank_transfer'
            timestamp: Date,
            status: {
                type: String,
                enum: ['completed', 'pending', 'failed'],
            },
            transactionId: String,
        },
    ],
    withdrawalHistory: [
        {
            amount: Number,
            method: String,
            timestamp: Date,
            status: {
                type: String,
                enum: ['completed', 'pending', 'failed'],
            },
            transactionId: String,
        },
    ],
}, { timestamps: true });
export default mongoose.model('Wallet', WalletSchema);
