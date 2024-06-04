const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const createWebToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '2h' })
}

const signup = async (req, res) => {
    const { username, password , passwordCheck} = req.body;

    try{
        const user = await User.signup(username, password, passwordCheck)
        const token = createWebToken(user._id)
        res.status(200).json({username, _id: user._id, token})
    }catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try{
      const user = await User.login(username, password)
      const token = createWebToken(user._id)
      res.status(200).json({username, _id: user._id, token})
    }catch(error){
      res.status(400).json({ error: error.message })
    }
}

const addToCart = async (req, res) => {
    const {itemID} = req.body
    try{
        let exists = false
        const user = await User.findById({_id: req.user._id})

        user.cart.forEach(e => {
            if(e.itemID === itemID){
                e.quantity += 1
                exists = true
            }  
        })

        if(!exists){
            user.cart.push({itemID})
        }

        const updatedUser = await user.save();

        //const cart = await User.findOneAndUpdate({_id: req.user._id},{$push: {cart: itemID}}, {new: true})
        res.status(200).json(updatedUser)

    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    signup,
    login,
    addToCart,
}