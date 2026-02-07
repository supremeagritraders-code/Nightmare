import mongoose, { Schema } from 'mongoose';
const betSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    marketId: {
        type: Schema.Types.ObjectId,
        ref: 'BettingMarket',
        required: [true, 'Market is required']
    },
    amount: {
        type: Number,
        required: [true, 'Bet amount is required'],
        min: [0.01, 'Bet amount must be at least 0.01']
    },
    odds: {
        type: Number,
        required: [true, 'Odds are required'],
        min: [1.01, 'Odds must be at least 1.01']
    },
    potentialWin: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'won', 'lost', 'cancelled'],
        default: 'pending'
    },
    betType: {
        type: String,
        required: true
    }
}, { timestamps: true });
export const Bet = mongoose.model('Bet', betSchema);
