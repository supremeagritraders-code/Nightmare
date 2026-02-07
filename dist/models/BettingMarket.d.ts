import mongoose, { Document } from 'mongoose';
export interface IBettingMarket extends Document {
    title: string;
    description: string;
    sport: string;
    status: 'open' | 'suspended' | 'closed';
    startDate: Date;
    endDate: Date;
    options: Array<{
        name: string;
        odds: number;
        totalBets: number;
    }>;
    createdAt: Date;
    updatedAt: Date;
}
export declare const BettingMarket: mongoose.Model<IBettingMarket, {}, {}, {}, mongoose.Document<unknown, {}, IBettingMarket, {}, {}> & IBettingMarket & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
