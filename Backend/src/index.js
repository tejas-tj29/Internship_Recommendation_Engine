import dbConnect from './db/db_connect.js'
import dotenv from 'dotenv'
import app from './app.js'

dotenv.config({
    path:'./env'
})
dbConnect()