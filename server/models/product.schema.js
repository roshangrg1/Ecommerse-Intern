import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
       name: {
            type: String,
            required: [true , "Please provide a product name"],
            trim: true,
            maxLength: [120 , " Product name must not be greater than 120 characters"]
        },
        price: {
            type: Number,
            required: [true , "Please provide a product price"],
            maxLength: [5, " Product price must not be greater than 5 digit"]
        },
        description: {
            type: String,
            required: [true, "Please provide product description"]
            // use some form of editor  - personal challange
          
        },
        photos:[
            {
                id : {
                    type: String,
                    required: true
                },
                secure_url: {
                    type: String,
                    required: true
                }
            }
        ],

        // updated at the time of order controller.
        stock: {
            type: Number,
            // default: 0
            required: [true, "Please a number in stock"]
        },
        sold: {
            type: Number,
            default: 0
        },
        collectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection"
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Product", productSchema)