import mongoose, { Document } from 'mongoose';
export interface IBet extends Document {
    userId: mongoose.Types.ObjectId;
    marketId: mongoose.Types.ObjectId;
    amount: number;
    odds: number;
    potentialWin: number;
    status: 'pending' | 'won' | 'lost' | 'cancelled';
    betType: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Bet: mongoose.Model<IBet, {}, {}, {}, mongoose.Document<unknown, {}, IBet, {}, {}> & IBet & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
