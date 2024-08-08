const mongoose = require('mongoose');

const uri = "mongodb+srv://codewithayaan:LEjx76mYvsasXdB4@cluster0.aiwvpgg.mongodb.net/E-commerce?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error(error);
});

db.once('open', () => {
    console.log("Connected to MongoDB using Mongoose!");
});


