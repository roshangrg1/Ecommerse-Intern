import Product from '../models/product.schema'

import fs from 'fs'
import tryCatchHandler from '../services/tryCatchHandler'
import WhereClause from '../utils/whereClause';
const cloudinary = require("cloudinary").v2

// create product --admin
export const createProduct = tryCatchHandler(async(req, res, next)=>{

    // images
    let imageArray =[];

    if(!req.files){
        return next(new CustomError('images are required', 400))
    }

    if (req.files){
        for(let i=0; i< req.files.photos.length; i++){
        // const element = req.files.photos[i];
        // cloudinary
            let result = await cloudinary.uploader.upload(req.files.photos[i].
            tempFilePath, {
                folder: 'products'
            }
            );

            imageArray.push({
                id: result.public_id,
                secure_url:result.secure_url
            })
        }
    }

    req.body.photos = imageArray;
    req.body.user = req.user.id

    const product =await Product.create(req.body)
    res.status(200).json({
        success:true,
        product,
    })
});

export const getAllProduct= tryCatchHandler(async(req,res, next) =>{

    const resultPerPage = 6
    const totalcountProduct = await Product.countDocuments()

    const products = new WhereClause(Product.find(), req.query).search().filter();

    const filteredProductNumber = products.length

    // products.limit().skip()

    products.pager(resultPerPage)
    products = await products.base
    
   

    res.status(200).json({
        success: true,
        products,
        filteredProductNumber,
        totalcountProduct,
    })
})