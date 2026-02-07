import { Router } from 'express'
import { authMiddleware } from '../middleware/auth'
import { 
  getWallet, 
  depositFunds, 
  withdrawFunds, 
  getTransactionHistory 
} from '../controllers/walletController'

const router = Router()

// All wallet routes require authentication
router.use(authMiddleware)

// Get wallet info
router.get('/', getWallet)

// Deposit funds (from Stripe/PayPal/Bank)
router.post('/deposit', depositFunds)

// Request withdrawal
router.post('/withdraw', withdrawFunds)

// Get transaction history
router.get('/history', getTransactionHistory)

export default router
