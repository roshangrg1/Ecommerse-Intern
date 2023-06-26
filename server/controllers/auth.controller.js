import User from '../models/user.schema.js'
import tryCatchHandler from '../services/tryCatchHandler.js'
import CustomError from '../utils/customError.js'

import mailHelper from '../utils/mailHelper.js'

import crypto from 'crypto'





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


export const forgotPassword = tryCatchHandler(async (req,res) =>{
    const {email} = req.body
    // check email for null or '' 
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

        await user.save({validateBeforeSave: false})

        throw new CustomError(error.message || 'Email sent failure')
    }
})

/***************************************************************************************
 * @RESET_PASSWORD
 * @route http://localhost:4000/api/auth/password/reser/:resetPasswordToken
 * @description: User will be able to reset password based on url token
 * @parameters token from url, password and confirmpass
 * @return User object
 ***************************************************************************************/


export const resetPassword = tryCatchHandler(async(req, res) =>{
    const {token: resetToken} = req.params
    const {password , confirmPassword} = req.body


    const resetPasswordToken =crypto
    .createHash('')
    .update(resetToken)
    .digest('hex')

    const user= await User.findOne({
        forgotPasswordToken: resetPasswordToken,
        forgotPasswordExpiry: {$gt:Date.now()}
    })

    if(!user){
        throw new CustomError('password token is invalid or expired', 400)
    }

    if (password !== confirmPassword){
        throw new CustomError(' Password and confirm Password does not matched', 400)
    }

    user.password = password
    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry= undefined

    await user.save()

    // create token and send as response 
    const token = user.getJwtToken()
    user.password = undefined
    
    // helper method for cookie can be added
    res.cookie('token',token , cookieOptions)

    res.status(200).json({
        success:true,
        user
    })
})

// TODO: create controller for change password

/***************************************************************************************
 * @GET_PROFILE
 * @REQUEST_TYPE GET
 * @route http://localhost:4000/api/auth/profile
 * @description: check for token and populate req.user
 * @parameters 
 * @return User object
 ***************************************************************************************/

export const getProfile = tryCatchHandler(async(req, res)=>{
    // req.user
    const {user} =  req
    if (!user){
        throw new CustomError('user not  found ', 404)
    }

    res.status(200).json({
        success:true,
        user
    })
})


// admin routes

export const adminAllUser = tryCatchHandler(async (req, res, next) => {
    // select all users
    const users = await User.find();
  
    // send all users
    res.status(200).json({
      success: true,
      users,
    });
  });
  

  