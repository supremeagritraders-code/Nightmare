import { Request, Response } from 'express'
import Wallet from '../models/Wallet'
import { User } from '../models/User'

// Extend Express Request to include userId
interface AuthRequest extends Request {
  userId?: string
}

// Get wallet balance
export const getWallet = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req

    let wallet = await Wallet.findOne({ userId })
    
    if (!wallet) {
      wallet = new Wallet({
        userId,
        balance: 0,
        currency: 'USD',
        depositHistory: [],
        withdrawalHistory: [],
      })
      await wallet.save()
    }

    res.json({
      success: true,
      wallet: {
        balance: wallet.balance,
        currency: wallet.currency,
        depositHistory: wallet.depositHistory,
        withdrawalHistory: wallet.withdrawalHistory,
      },
    })
  } catch (error) {
    console.error('Error fetching wallet:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch wallet' })
  }
}

// Add balance to wallet (Stripe/PayPal callback)
export const depositFunds = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req
    const { amount, method, transactionId } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' })
    }

    let wallet = await Wallet.findOne({ userId })
    
    if (!wallet) {
      wallet = new Wallet({
        userId,
        balance: amount,
        currency: 'USD',
      })
    } else {
      wallet.balance += amount
    }

    wallet.depositHistory.push({
      amount,
      method: method || 'unknown',
      timestamp: new Date(),
      status: 'completed',
      transactionId: transactionId || `TXN-${Date.now()}`,
    })

    await wallet.save()

    res.json({
      success: true,
      message: 'Deposit successful',
      balance: wallet.balance,
    })
  } catch (error) {
    console.error('Error processing deposit:', error)
    res.status(500).json({ success: false, message: 'Deposit failed' })
  }
}

// Withdraw funds
export const withdrawFunds = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req
    const { amount, method } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' })
    }

    const wallet = await Wallet.findOne({ userId })

    if (!wallet) {
      return res.status(404).json({ success: false, message: 'Wallet not found' })
    }

    if (wallet.balance < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' })
    }

    wallet.balance -= amount
    wallet.withdrawalHistory.push({
      amount,
      method: method || 'bank_transfer',
      timestamp: new Date(),
      status: 'pending', // Usually pending until processed
      transactionId: `WD-${Date.now()}`,
    })

    await wallet.save()

    res.json({
      success: true,
      message: 'Withdrawal request submitted',
      balance: wallet.balance,
    })
  } catch (error) {
    console.error('Error processing withdrawal:', error)
    res.status(500).json({ success: false, message: 'Withdrawal failed' })
  }
}

// Get transaction history
export const getTransactionHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req
    const { type = 'all', limit = 10 } = req.query

    const wallet = await Wallet.findOne({ userId })

    if (!wallet) {
      return res.status(404).json({ success: false, message: 'Wallet not found' })
    }

    let transactions: any[] = []

    if (type === 'deposits' || type === 'all') {
      transactions = transactions.concat(
        wallet.depositHistory.slice(0, Number(limit)).map(t => ({
          ...t,
          type: 'deposit',
        }))
      )
    }

    if (type === 'withdrawals' || type === 'all') {
      transactions = transactions.concat(
        wallet.withdrawalHistory.slice(0, Number(limit)).map(t => ({
          ...t,
          type: 'withdrawal',
        }))
      )
    }

    // Sort by timestamp (newest first)
    transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    res.json({
      success: true,
      transactions: transactions.slice(0, Number(limit)),
    })
  } catch (error) {
    console.error('Error fetching transaction history:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch history' })
  }
}
