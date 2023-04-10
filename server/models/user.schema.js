import mongoose from 'mongoose';
import AuthRoles from '../utils/authRoles';
const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Name is required"],
            maxLength: [50 , "Name must be less than 50"]
        },
        email:{
            type: String,
            required: [true, "Email is required"],
            unique: true
        },
        password:{
            type: String,
            required: [true, "Password is required"],
            minLength: [7 , "Password must be atleast 7 characters"],
            select: false
        },
        roles:{
            type:String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER,
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", userSchema)