import Product from '../models/product.schema.js'

import fs from 'fs'
import tryCatchHandler from '../services/tryCatchHandler.js'
import WhereClause from '../utils/whereClause.js';
import CustomError from '../utils/customError.js';
import { v2 as cloudinary } from "cloudinary";

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

export const getOneProduct= tryCatchHandler(async(req,res, next) =>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new CustomError('No product found with this id', 400))
    }
  
    res.status(200).json({
        success:true,
        product

    })
})

// admin only

export const adminGetAllProduct = tryCatchHandler(async (req, res , next)=>{
    const products = await Product.find()


    res.status(200).json({
        success:true,
        products

    })
})

export const adminUpdateOneProduct = tryCatchHandler(async(req, res, next)=>{
    const product = await  Product.find(req.params.id);

    if (!product){
        return next (new CustomError("No product found with this id", 400))
    }

    let imagesArray =[]

    if(req.files){
        // destroy the existing image
        
        for (let i = 0; i < array.length; i++) {
            const res = await cloudinary.uploader.destroy(product.photos[i].id)
            
        }
        // upload and save the images

        for(let i=0; i< req.files.photos.length; i++){
            // const element = req.files.photos[i];
            // cloudinary
                let result = await cloudinary.uploader.upload(req.files.photos[i].
                tempFilePath, {
                    folder: 'products'
                }
                );
    
                imagesArray.push({
                    id: result.public_id,
                    secure_url:result.secure_url
                })
            }
    }

    req.body.photos = imagesArray

    product = await Product.findByIdAndUpdate(req.param.id, req.body,{
        new: true,
        runValidator: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product,
    })
})

export const adminDeleteOneProduct = tryCatchHandler(async(req, res, next)=>{
    const product = await  Product.find(req.params.id);

    if (!product){
        return next (new CustomError("No product found with this id", 400))
    }

    // destroy the existing image.
    for (let i = 0; i < array.length; i++) {
        const res = await cloudinary.uploader.destroy(product.photos[i].id)
        
    }
    
   await product.remove()

    res.status(200).json({
        success: true,
        message: "Product was deleted !"
    })
})



