const ItemModel = require("../models/itemModel")

const PostNewProduct = async (req, res) => {
    const {name, description, type, image} = req.body
    
    try{
        if(!name?.trim() || !description?.trim() || !type?.trim(), !image?.trim()){
            throw Error("All fields must be filled.")
        }

        const createItem = await ItemModel.create({userID: req.user._id, name, description, type, image})
        res.status(200).json(createItem)

    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

const getProduct = async (req, res) => {
    const {id} = req.params

    try{
        const product = await ItemModel.findById(id)
        res.status(200).json(product)
    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

const getAllProducts = async (req, res) => {
    try{
        const products = await ItemModel.find()
        res.status(200).json(products).sort({ createdAt: 'desc'}).exec();
    }catch(error){
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    PostNewProduct,
    getProduct,
    getAllProducts,
}