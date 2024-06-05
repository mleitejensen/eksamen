const { Router } = require('express');
const router = Router()
const { PostNewProduct, getProduct, getAllProducts, getNewestProducts, getCategoryProducts, getTypesAvailable, postTypeAvailable, deleteProduct } = require("../controllers/itemController")

const {requireAuth} = require("../middleware/requireAuth")
const {requireAdmin} = require("../middleware/requireAdmin")

router.get("/product/:id", getProduct)
router.get("/products", getAllProducts)
router.get("/newest", getNewestProducts)
router.get("/type", getTypesAvailable)
router.post("/type", postTypeAvailable)
router.get("/type/:type", getCategoryProducts)

router.post("/create", requireAuth, requireAdmin, PostNewProduct)
router.delete("/delete", requireAuth, requireAdmin, deleteProduct)

module.exports = router