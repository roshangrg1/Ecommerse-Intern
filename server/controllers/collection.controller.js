import Collection from '../models/collection.schema'
import tryCatchHandler from '../services/tryCatchHandler'
import CustomError from '../utils/customError'

export const createCollection = tryCatchHandler(async (req, res)=>{
    // take name from frontend.
    const {name}= req.body

    if (!name){
        throw new CustomError("Collection name is required", 400)
    }

    //add this name to database
     const collection =Collection.create ({
        name
    })

    // send this response value to frontend
    res.status(200).json({
        success:true,
        message: "Collection created with success",
        collection
    })
})

export const readCollection = tryCatchHandler(async (req, res) =>{

    
})