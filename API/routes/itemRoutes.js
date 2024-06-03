const { Router } = require('express');
const router = Router()
const { PostNewProduct } = require("../controllers/itemController")
//const {requireAuth} = require("../middleware/requireAuth")

router.post("/create", PostNewProduct)

module.exports = router