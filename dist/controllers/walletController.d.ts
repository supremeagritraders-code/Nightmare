import { Request, Response } from 'express';
interface AuthRequest extends Request {
    userId?: string;
}
export declare const getWallet: (req: AuthRequest, res: Response) => Promise<void>;
export declare const depositFunds: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const withdrawFunds: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getTransactionHistory: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
