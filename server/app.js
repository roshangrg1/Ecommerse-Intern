import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'




const app = express()



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())


// Morgon logger
app.use(morgan('tiny'))

// import all routes here 
import  home from './routes/home.js'
import auth from './routes/auth.js'



// router middleware
app.use('/api/v1/' , home)
app.use('/api/v1/', auth )

export default app