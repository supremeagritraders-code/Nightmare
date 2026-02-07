import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
export declare const placeBet: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserBets: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getMarkets: (_req: AuthRequest, res: Response) => Promise<void>;
export declare const getMarketById: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
