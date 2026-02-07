import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { config } from './config/index.js'
import { connectDB } from './config/database.js'
import authRoutes from './routes/authRoutes.js'
import bettingRoutes from './routes/bettingRoutes.js'
import walletRoutes from './routes/walletRoutes.js'

const app = express()

// Middleware
app.use(helmet())
app.use(cors({ origin: config.corsOrigin }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect Database
connectDB()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/betting', bettingRoutes)
app.use('/api/wallet', walletRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Nightmare API is running' })
})

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  })
})

// Start server
const PORT = config.port
app.listen(PORT, () => {
  console.log(`Nightmare API running on port ${PORT}`)
})

export default app
