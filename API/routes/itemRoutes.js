const { Router } = require('express');
const router = Router()
const { PostNewProduct, getProduct, getAllProducts } = require("../controllers/itemController")

const {requireAuth} = require("../middleware/requireAuth")

router.get("/product/:id", getProduct)
router.get("/products", getAllProducts)

router.post("/create", requireAuth, PostNewProduct)

module.exports = router