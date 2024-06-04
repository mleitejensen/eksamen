const ItemModel = require("../models/itemModel")
const TypeModel = require("../models/typeModel")

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

const getNewestProducts = async (req, res) => {
    try{
        let newest = []
        let types = []
        
        const findAllTypes = await ItemModel.find()

        findAllTypes.forEach(e => {
            if(!types.includes(e.type)){
                types.push(e.type)
            }
        });

        for(const type of types){
            const products = await ItemModel.find({type}).sort({ createdAt: 'desc'}).exec();
            newest.push(products[0])
        }

        res.status(200).json({newest})
    }catch(error){
        res.status(400).json({ error: error.message })
    }
} 

const getCategoryProducts = async (req, res) => {
    const {type} = req.params
    try{
        const products = await ItemModel.find({type}).sort({ createdAt: 'desc'}).exec();
        res.status(200).json({products})
    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

const getTypesAvailable = async (req, res) => {
    try{
        const types = await TypeModel.find()
        res.status(200).json({types})
    }catch(error){
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    PostNewProduct,
    getProduct,
    getAllProducts,
    getNewestProducts,
    getCategoryProducts,
    getTypesAvailable
}