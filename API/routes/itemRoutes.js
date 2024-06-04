const { Router } = require('express');
const router = Router()
const { PostNewProduct, getProduct, getAllProducts, getNewestProducts } = require("../controllers/itemController")

const {requireAuth} = require("../middleware/requireAuth")

router.get("/product/:id", getProduct)
router.get("/products", getAllProducts)
router.get("/newest", getNewestProducts)

router.post("/create", requireAuth, PostNewProduct)

module.exports = router