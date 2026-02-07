import dotenv from 'dotenv';
dotenv.config();
export const config = {
    port: process.env.PORT || 3000,
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nightmare',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};
