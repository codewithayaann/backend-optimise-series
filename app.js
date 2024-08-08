// app.js
const express = require('express');
const app = express();
const cors = require('cors');
const redis = require('redis');


const ProductRouter = require('./routes/product');
const PaymentRouter = require('./routes/payment');

require("./connect");

const rateLimit = require('express-rate-limit');
const publish = require('./pub-sub/publish');
const subscribe = require('./controller/subscribe');


// Define the rate limit configuration
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    headers: true, // Send rate limit info in headers
});

app.use(limiter);



const client = redis.createClient({ host: 'localhost', port: 6379 });
let connected = false;

(async () => {
    if (!connected) {
        await client.connect();
        connected = true;
    }
})();

client.on('connect', () => console.log('Redis Client Connected'));
client.on('error', (err) => console.log('Redis Client Connection Error', err));


// Enable JSON parsing
app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the backend!');
});


app.use('/api/products', ProductRouter);
app.use('/api/payment', PaymentRouter);
app.use('/api/send', publish)
























setInterval(() => {
    subscribe();
}, 1000);


// Start the server
const port = 9000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});