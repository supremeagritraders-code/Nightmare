import mongoose, { Schema, Document } from 'mongoose'

export interface IBettingMarket extends Document {
  title: string
  description: string
  sport: string
  status: 'open' | 'suspended' | 'closed'
  startDate: Date
  endDate: Date
  options: Array<{
    name: string
    odds: number
    totalBets: number
  }>
  createdAt: Date
  updatedAt: Date
}

const bettingMarketSchema = new Schema<IBettingMarket>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    sport: {
      type: String,
      required: [true, 'Sport is required'],
      enum: ['football', 'basketball', 'tennis', 'cricket', 'other']
    },
    status: {
      type: String,
      enum: ['open', 'suspended', 'closed'],
      default: 'open'
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required']
    },
    options: [
      {
        name: {
          type: String,
          required: true
        },
        odds: {
          type: Number,
          required: true,
          min: [1.01, 'Odds must be at least 1.01']
        },
        totalBets: {
          type: Number,
          default: 0
        }
      }
    ]
  },
  { timestamps: true }
)

export const BettingMarket = mongoose.model<IBettingMarket>('BettingMarket', bettingMarketSchema)
