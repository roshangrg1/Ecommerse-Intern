import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'

import cloudinary from 'cloudinary'
import config from './config/index.js'
import fileUpload from 'express-fileupload'

 cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
  })


const app = express()



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())


// Morgon logger
app.use(morgan('tiny'))

// Note that this option available for versions 1.0.0 and newer. 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// import all routes here 
import  home from './routes/home.js'
import auth from './routes/auth.js'
import product from './routes/product.js'
import collection from './routes/collection.js'
import order from './routes/order.js'



// router middleware
app.use('/api/v1/', home)
app.use('/api/v1/', auth )
app.use('/api/v1/', product )
app.use('/api/v1/', collection )
app.use('/api/v1/', order)


export default app