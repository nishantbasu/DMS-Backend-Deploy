require('dotenv').config();
require('express-async-errors');

const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();

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

//app start
const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        });
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