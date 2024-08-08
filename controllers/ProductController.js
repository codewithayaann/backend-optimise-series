// controllers/ProductController.js
const Product = require('../models/Product');
const async = require('async');


// console.log(`[${postQueue.length()}]: ${user.email} has invited.`);


function sendEmail(user, callback) {
    return new Promise((res) => {
        setTimeout(() => {
            console.log(`${user.email} has been invited.`);
            res()
        }, 2000)
    }).then(() => callback(null, user))
}


// Create a queue with a specified concurrency level
const postQueue = async.queue(sendEmail, 5);


class ProductController {
    async getAllProducts(req, res) {
        try {
            const products = await Product.find()
            return res.status(200).json({
                data: products,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching products' });
        }
    }

    async getProduct(req, res) {
        try {
            const id = req.params.id;
            const product = await Product.findById(id).exec();
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
            } else {
                res.json(product);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching product' });
        }
    }

    async createProduct(req, res) {
        try {
            const product = new Product(req.body);
            await product.save();
            res.json(product);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error creating product' });
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.id;
            const product = await Product.findByIdAndUpdate(id, req.body, { new: true }).exec();
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
            } else {
                res.json(product);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error updating product' });
        }
    }

    async deleteProduct(req, res) {
        try {
            const id = req.params.id;
            await Product.findByIdAndRemove(id).exec();
            res.json({ message: 'Product deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error deleting product' });
        }
    }

    async getAllProductPaginatedCached(req, res) {
        //  'localhost:9000/products?page=1&limit=10'
        const { page = 1, limit = 10 } = req.query;
        try {
            const cacheKey = `products_${page}_${limit}`;


            const cachedProducts = await client.get(cacheKey);

            if (Boolean(cachedProducts)) {
                return res.json({
                    data: JSON.parse(cachedProducts),
                    nextPage: +page + 1,
                    cache: true
                });
            }
            const products = await Product.find()
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
            console.log("caliing again")
            client.set(cacheKey, JSON.stringify(products), 'EX', 3600);

            return res.json({
                data: products,
                nextPage: products.length ? +page + 1 : null
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching products' });
        }
    }

    async addInCart(req, res) {
        return res.json({
            cart: true
        }).status(200)
    }

    async productLiked(req, res) {
        return res.status(200).json({
            isFavorute: true,
        })
    }


    async inviteUsers(req, res) {
        const userEmails = req.body || []
        userEmails.forEach((email) => {
            postQueue.push({ email }, (err) => {
                if (err) return
            });
        })

        postQueue.drain(() => {
            console.log('All users has been invited');
        });

        res.status(200).json({ message: 'Done' });
    }

}

module.exports = new ProductController();