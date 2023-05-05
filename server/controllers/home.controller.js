import trycatchhandler from '../services/tryCatchHandler.js'

export const home = trycatchhandler(async (req, res)=>{
    res.status(200).json({
        success: true,
        message:'hello from api'
    })
})

export const homedummy = trycatchhandler(async (req, res)=>{
    res.status(200).json({
        success: true,
        message:'dummy is also working'
    })
})