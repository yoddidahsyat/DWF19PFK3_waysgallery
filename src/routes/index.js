const express = require('express')
const router = express.Router()


const { getProducts, getProduct, addProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { getToppings, getTopping, addTopping, updateTopping, deleteTopping } = require('../controllers/topping')
const { getUsers, getUser, deleteUser, restoreUser } = require('../controllers/user')
const { getTransactions } = require('../controllers/transaction')

// ---------------- USERS --------------------- //
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.delete('/user/:id', deleteUser)
router.post('/user/:id', restoreUser)


// --------------- PRODUCTS ------------------- //
router.get('/products', getProducts)
router.get('/product/:id', getProduct)
router.post('/product', addProduct)
router.patch('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)


// --------------- TOPPINGS ------------------- //
router.get('/toppings', getToppings)
router.get('/topping/:id', getTopping)
router.post('/topping', addTopping)
router.patch('/topping/:id', updateTopping)
router.delete('/topping/:id', deleteTopping)


// ---------------- TRANSACTIONS ---------------- //
router.get('/transactions', getTransactions)

module.exports = router