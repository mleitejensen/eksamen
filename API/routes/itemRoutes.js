const { Router } = require('express');
const router = Router()
const { PostNewProduct, getProduct, getAllProducts } = require("../controllers/itemController")
//const {requireAuth} = require("../middleware/requireAuth")

router.post("/create", PostNewProduct)
router.get("/product/:id", getProduct)
router.get("/products", getAllProducts)

module.exports = router