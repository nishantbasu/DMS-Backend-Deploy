require('dotenv').config();
require('express-async-errors');

const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');

const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const cron = require('node-cron');

const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));

const connectDb = require('./db/connect');
const authenticationMiddleware = require('./middleware/auth');

const userRoute = require('./routes/users');
const orderRoute = require('./routes/order');
const contentRoute = require('./routes/content');
const hubsRoute = require('./routes/hub');
const categoryRoute = require('./routes/category');
const ridersRoute = require('./routes/rider');
const dmsRoute = require('./routes/dms');


const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

let corsOptions = { 
    origin : '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}


app.set('trust proxy', 1);
// app.options('/api/v1/dms', (req, res) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.sendStatus(200);
// });
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 500
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors(corsOptions));

//routes

app.use('/api/v1/auth', userRoute);
app.use('/api/v1/orders', authenticationMiddleware, orderRoute);
app.use('/api/v1/content', authenticationMiddleware, contentRoute);
app.use('/api/v1/hubs', authenticationMiddleware, hubsRoute);
app.use('/api/v1/category', authenticationMiddleware, categoryRoute);
app.use('/api/v1/riders', authenticationMiddleware, ridersRoute);
app.use('/api/v1/dms', authenticationMiddleware, dmsRoute);

//error handling
app.use(notFound);
app.use(errorHandlerMiddleware);

// scheduler
const Orders = require('./models/order');

// Function to delete old orders
const deleteOldOrders = async () => {
    const eightDaysAgo = new Date();
    eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);

    try {
        const oldOrders = await Orders.find({ createdAt: { $lt: eightDaysAgo } });

        // Delete the orders
        const result = await Orders.deleteMany({ createdAt: { $lt: eightDaysAgo } });

        // Delete the corresponding image folders
        oldOrders.forEach(order => {
            const orderId = order._id.toString();
            const orderFolderPath = path.join(__dirname, 'uploads', orderId);

            // Check if the folder exists
            if (fs.existsSync(orderFolderPath)) {
                // Delete the folder and its contents
                fs.rmdirSync(orderFolderPath, { recursive: true });
            }
        });
    } catch (error) {
        console.error('Error deleting old orders or their folders:', error);
    }
};
// Schedule the cron job to run every day at midnight
cron.schedule('0 0 * * *', () => {
    deleteOldOrders();
});

//app start
const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        });
        await deleteOldOrders();
    } catch (error) {
        console.log(error);
    }
}

start();




//for post request middleware for body = app.use(express.json())= >req.body
//req => middleware => res :  app.use()
//middleware can add things to req object
//api/v1/:productId => req.params
//api/v1/query => req.query

//router is a new file const router = express.Router() and instead of app use router.get() module.exports = router => now in app use => auth = require('new file')
//and app.use('/api',auth ); all go to route

//controller for functioning
//const getPeople = (req, res) =>{ res.whatever functionality } , now module export functions then in routes replace the fucntionality