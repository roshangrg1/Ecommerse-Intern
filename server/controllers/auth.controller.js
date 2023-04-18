import User from '../models/user.schema'
import tryCatchHandler from '../services/tryCatchHandler'
import CustomError from '../utils/customError'

import mailHelper from '../utils/mailHelper'





export const cookieOptions={
    expires: new Date (Date.now() + 3 * 24 * 60 *60 * 1000),
    httpOnly: true,

    // could be in separate filee in utils 
}


/****************************************************************************************
 * @SignUp
 * @route http://localhost:4000/api/auth/signup
 * @description User signup Controller for creating new user
 * @parameter name , email ,password
 * @returns User Object

 * *********************************************************************************** */


export const signUp= tryCatchHandler (async (req, res)=>{
    const {name, email, password} = req.body

    if(!name || !email || !password){
        throw new CustomError('Please fill all fields', 400)
    }

    // check if user exists

    const existingUser =await User.findOne({email})

    if (existingUser){
        throw new CustomError('User alreaady exists',400)
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.getJwtToken()
    console.log(user);
    user.password = undefined

    res.cookie("token", token, cookieOptions);
    res.status(200).json({
        success:true,
        token,
        user
    })
})

/****************************************************************************************
 * @LOGIN
 * @route http://localhost:4000/api/auth/login
 * @description User signIn Controller for loging new user
 * @parameter  email ,password
 * @returns User Object

 * *********************************************************************************** */

export const login = tryCatchHandler (async(req,res) =>{
    const {email, password} = req.body

    if( !email || !password){
        throw new CustomError('Please fill all fields', 400)
    }

    const user= await User.findOne({email}).select("+password")

    if(!user){
        throw new CustomError('Invalid credentials', 400)
    }

    const isPasswordMatched =await user.comparePassword(password)

    if(isPasswordMatched){
        const token = user.getJwtToken()
        user.password = undefined;
        res.cookie("token", token, cookieOptions)
        return res.status(200).json({
            success:true,
            token,
            user
        })
    }

    throw new CustomError('Invalid credentials - pass', 400)
})

/***************************************************************************************
 * @LOGOUT
 * @route http://localhost:4000/api/auth/logout
 * @description: User signout by clearing cookie
 * @parameters 
 * @return success message
 ***************************************************************************************/

export const logout = tryCatchHandler(async (_req, res) =>{
    // res.clearCookie()
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

/***************************************************************************************
 * @FORGOT_PASSWORD
 * @route http://localhost:4000/api/auth/password/forgot
 * @description: User will submit email and we will generate a token
 * @parameters email
 * @return success message - email send
 ***************************************************************************************/


export const forgotPassword = trycatchHandler(async (req,res) =>{
    const {email} = req.body

    const user = await User.findOne({email})

    if (!user){
        throw new CustomError("User not found", 404)
    }
    const resetToken = user.generateForgotPasswordToken()

    await user.save({validateBeforeSave : false})

    const resetUrl =
    `${req.protocol}://${req.get("host")}/api/auth/password/reset/${resetToken}`

    const text = `Your password reset url is  \n\n ${resetUrl}\n\n`

    try {
        await mailHelper({
            email:user.email,
            subject: "Password reset email for website",
            text:text,
        })
        res.status(200).json({
            success:true,
            message: `Email send to ${user.email}`
        })
    } catch (error) {
        // rollback - clear fields and save.
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry= undefined

        user.save({validateBeforeSave: false})

        throw new CustomError(error.message || 'Email sent failure')
    }
})

