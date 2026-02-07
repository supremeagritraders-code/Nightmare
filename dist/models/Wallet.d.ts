import mongoose, { Document } from 'mongoose';
export interface IWallet extends Document {
    userId: mongoose.Types.ObjectId;
    balance: number;
    currency: string;
    depositHistory: Array<{
        amount: number;
        method: string;
        timestamp: Date;
        status: 'completed' | 'pending' | 'failed';
        transactionId: string;
    }>;
    withdrawalHistory: Array<{
        amount: number;
        method: string;
        timestamp: Date;
        status: 'completed' | 'pending' | 'failed';
        transactionId: string;
    }>;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IWallet, {}, {}, {}, mongoose.Document<unknown, {}, IWallet, {}, {}> & IWallet & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
