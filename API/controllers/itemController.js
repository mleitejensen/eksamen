const ItemModel = require("../models/itemModel")

const PostNewProduct = async (req, res) => {
    const {userID, description, name, type, image} = req.body
    try{
        if(!userID.trim() || !name.trim() || !description.trim() || !type.trim(), !image.trim()){
            throw Error("All fields must be filled.")
        }

        const createItem = await ItemModel.create({userID, name, description, type, image})
        res.status(200).json(createItem)

    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    PostNewProduct
}