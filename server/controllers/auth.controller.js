import User from '../models/user.schema'
import tryCatchHandler from '../services/tryCatchHandler'
import CustomError from '../utils/customError'





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

    const user= User.findOne({email}).select("+password")

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