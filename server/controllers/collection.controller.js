import Collection from '../models/collection.schema.js'
import tryCatchHandler from '../services/tryCatchHandler.js'
import CustomError from '../utils/customError.js'

/***************************************************************************************
 * @Create_COLLECTION
 * @route http://localhost:4000/api/collection
 * @description: FOR CREATING COLLECTION
 * @parameters 
 * @return COLLECTION
 ***************************************************************************************/

export const createCollection = tryCatchHandler(async (req, res)=>{
    // take name from frontend.
    const {name}= req.body

    if (!name){
        throw new CustomError("Collection name is required", 400)
    }

    //add this name to database
     const collection = await Collection.create ({
        name
    })

    // send this response value to frontend
    res.status(200).json({
        success:true,
        message: "Collection created with success",
        collection
    })
})


/***************************************************************************************
 * @UPDATE_COLLECTION
 * @route http://localhost:4000/api/collection
 * @description: FOR EDITING / UPDATING COLLECTION
 * @parameters 
 * @return COLLECTION
 ***************************************************************************************/
export const updateCollection = tryCatchHandler(async (req, res) =>{
    // existing value to be updates
    const {id:CollectionId} = req.params
    // new value to get updated
    const {name}= req.body

    if(!name){
        throw new CustomError("Collection name is required", 400)
    }
    
    let updatedCollection = await Collection.findByIdAndUpdate(
        CollectionId,
        {
            name
        },
        {
            new:true,
            runValidators:true
        }
    )

    if(!updatedCollection){
        throw new CustomError("Collection not found", 400)
    }

    // send response to frontend
    res.status(200).json({
        success:true,
        message:"Collection updated successfully",
        updatedCollection

    })
})

/***************************************************************************************
 * @DELETE_COLLECTION
 * @route http://localhost:4000/api/collection
 * @description: FOR DELETING COLLECTION
 * @parameters 
 * @return COLLECTION
 ***************************************************************************************/

export const deleteCollection = tryCatchHandler(async (req, res)=>{
    const {id:collectionId}= req.params

    const collectionToDelete= await Collection.findOneAndDelete(collectionId);

    if(!collectionToDelete){
        throw new CustomError("Collection not found", 400)
    }
        collectionToDelete.deleteOne()
    // send response to frontend
    res.status(200).json({
        success:true,
        message: "collection deleted sucessfully",
        // collectionToDelete1
    })
})

/***************************************************************************************
 * @GET_ALL_COLLECTION
 * @route http://localhost:4000/api/collection
 * @description: TO READ ALL THE COLLECTION
 * @parameters 
 * @return COLLECTION
 ***************************************************************************************/
export const getAllCollections = tryCatchHandler(async ( req, res)=>{
    const collections = await Collection.find()

    if(!collections){
        throw new CustomError("No Collection found", 400)
    }

    res.status(200).json({
        success:true,
        collections
    })
})