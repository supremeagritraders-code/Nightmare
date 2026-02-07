import { Router } from 'express'
import { placeBet, getUserBets, getMarkets, getMarketById } from '../controllers/bettingController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.post('/place-bet', authMiddleware, placeBet)
router.get('/user-bets', authMiddleware, getUserBets)
router.get('/markets', authMiddleware, getMarkets)
router.get('/markets/:id', authMiddleware, getMarketById)

export default router
