import mongoose from 'mongoose'
require('dotenv').config()

import User from './User'

const dbURL = process.env.DB_CONNECT;

const connectDB = () => {
    console.log("Database url: " + dbURL.slice(10, 20) + '...')
    return mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
}

const models = { User }

export { connectDB }

export default models