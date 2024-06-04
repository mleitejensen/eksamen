const { Router } = require('express');
const router = Router()
const { PostNewProduct, getProduct, getAllProducts, getNewestProducts, getCategoryProducts, getTypesAvailable, postTypeAvailable } = require("../controllers/itemController")

const {requireAuth} = require("../middleware/requireAuth")
const {requireAdmin} = require("../middleware/requireAdmin")

router.get("/product/:id", getProduct)
router.get("/products", getAllProducts)
router.get("/newest", getNewestProducts)
router.get("/type", getTypesAvailable)
router.post("/type", postTypeAvailable)
router.get("/type/:type", getCategoryProducts)

router.post("/create", requireAuth, requireAdmin, PostNewProduct)

module.exports = router