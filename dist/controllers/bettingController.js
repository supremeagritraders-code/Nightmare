import { Bet } from '../models/Bet.js';
import { BettingMarket } from '../models/BettingMarket.js';
import { User } from '../models/User.js';
import Wallet from '../models/Wallet.js';
// Place a bet
export const placeBet = async (req, res) => {
    try {
        const { marketId, amount, odds, betType } = req.body;
        const userId = req.userId;
        if (!marketId || !amount || !odds || !betType) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check wallet balance instead of user.balance
        let wallet = await Wallet.findOne({ userId });
        if (!wallet) {
            return res.status(400).json({ message: 'Wallet not initialized' });
        }
        if (wallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient wallet balance' });
        }
        const market = await BettingMarket.findById(marketId);
        if (!market) {
            return res.status(404).json({ message: 'Market not found' });
        }
        if (market.status !== 'open') {
            return res.status(400).json({ message: 'Market is not open for betting' });
        }
        const potentialWin = amount * odds;
        const bet = new Bet({
            userId,
            marketId,
            amount,
            odds,
            potentialWin,
            betType,
            status: 'pending'
        });
        await bet.save();
        // Deduct amount from wallet balance
        wallet.balance -= amount;
        wallet.withdrawalHistory.push({
            amount,
            method: 'bet_placed',
            timestamp: new Date(),
            status: 'completed',
            transactionId: `BET-${bet._id}`,
        });
        await wallet.save();
        res.status(201).json({
            message: 'Bet placed successfully',
            bet: {
                id: bet._id,
                amount: bet.amount,
                odds: bet.odds,
                potentialWin: bet.potentialWin,
                status: bet.status
            },
            walletBalance: wallet.balance
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
// Get user bets
export const getUserBets = async (req, res) => {
    try {
        const userId = req.userId;
        const bets = await Bet.find({ userId }).populate('marketId');
        res.json({
            bets
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
// Get all markets
export const getMarkets = async (_req, res) => {
    try {
        const markets = await BettingMarket.find({ status: 'open' });
        res.json({
            markets
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
// Get market by ID
export const getMarketById = async (req, res) => {
    try {
        const { id } = req.params;
        const market = await BettingMarket.findById(id);
        if (!market) {
            return res.status(404).json({ message: 'Market not found' });
        }
        res.json({ market });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
