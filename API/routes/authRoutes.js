const { Router } = require('express');
const router = Router()
const { signup, login, addToCart } = require("../controllers/authController")

const {requireAuth} = require("../middleware/requireAuth")

router.post("/signup", signup)
router.post("/login", login)

router.patch("/add", requireAuth, addToCart)

module.exports = router