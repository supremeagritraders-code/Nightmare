import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    fullName: string;
    role: 'user' | 'admin';
    balance: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(password: string): Promise<boolean>;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
