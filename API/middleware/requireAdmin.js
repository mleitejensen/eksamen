const User = require("../models/userModel")

const requireAdmin = async (req, res, next) => {
    try{
        const user = await User.findById({_id: req.user._id})
        if(!user.admin){
            throw Error("Request is not authorized as admin")
        }

        next()
    }catch(error){
        res.status(401).json({error: error.message})
    }
}

module.exports = {
    requireAdmin
}