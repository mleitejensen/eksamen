const ItemModel = require("../models/itemModel")
const TypeModel = require("../models/typeModel")

const PostNewProduct = async (req, res) => {
    const {name, description, type, image} = req.body
    
    try{
        if(!name?.trim() || !description?.trim() || !type?.trim() || !image?.trim()){
            throw Error("All fields must be filled.")
        }

        const createItem = await ItemModel.create({userID: req.user._id, name, description, type, image})
        res.status(200).json({success: "Product posted", createItem})

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
        let list = []
        const types = await TypeModel.find()
        types.forEach(e => {
            list.push(e.type)
        })

        res.status(200).json({types: list})
    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

const postTypeAvailable = async (req, res) => {
    const {type} = req.body
    try{
        const newType = await TypeModel.create({type})
        res.status(200).json({newType})
    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.body
    try{
        const del = await ItemModel.findByIdAndDelete(id)
        res.json({success: "Deleted product", product})
    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

const editProduct = async (req, res) => {
    const {productId, newName, newDescription, newImage, newType} = req.body
    try{
        if(!productId?.trim() || !newName?.trim() || !newDescription?.trim() || !newType?.trim() || !newImage?.trim()){
            throw Error("All fields must be filled.")
        }

        findProduct = await ItemModel.findOne({_id: productId})

        if(findProduct?.name === newName && findProduct?.description === newDescription && findProduct?.image === newImage && findProduct?.type === type){
            throw Error("No changes were made")
        }

        const updateProduct = await ItemModel.findOneAndUpdate({_id: productId}, {name: newName, description: newDescription, image: newImage}, {new: true})

        res.status(200).json(updateProduct)
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
    getTypesAvailable,
    postTypeAvailable,
    deleteProduct,
    editProduct,
}