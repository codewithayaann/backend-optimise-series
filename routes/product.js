// payment.route.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');


router.get('/products', ProductController.getAllProductPaginatedCached);
router.get('/products/:id', ProductController.getProduct);
router.post('/products', ProductController.createProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);
router.post('/invite-users', ProductController.inviteUsers);
router.post('/add-to-cart', ProductController.addInCart);
router.post('/product-liked/:id', ProductController.productLiked);


router.post('/send-report', (req, res) => {
    sendReport()
    res.send("Done")
});


module.exports = router;