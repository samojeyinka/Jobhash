//IMPORT EXPRESS
const express = require('express');
//INVOKE EXPRESS TO APP
const app = express();
//IMPORT AND REQUIRE ASYNC ERRORS PACKAGE
require('express-async-errors');
//IMPORT AND REQUIRE DOTENV
require('dotenv').config();
//IMPORT ROUTES
const usersRouter = require('./routes/user');
const jobsRouter = require('./routes/job');
//MIDDLEWARES
const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const authed = require('./middlewares/authenticated');
//IMPORT DATABASE
const connectDB = require('./db/connect');
//IMPORT CORS
const cors = require('cors')
//EXTRA SECURITIES PACKAGES
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimter = require('express-rate-limit');

app.set('trust proxy', 1);
app.use(rateLimter({
    windowMs: 15 * 60 * 1000,
    limit: 1000,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
}))
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

app.use('/api/v1/auth', usersRouter);
app.use('/api/v1/jobs',authed, jobsRouter);

app.get('/', (req, res) => {
    res.send('<h1>JOBBAG</h1><a href="/">Documentation</a>');
});


app.use(notFound);
 app.use(errorHandlerMiddleware); 


//PORT ADDRESS  
const port = process.env.PORT || 2500;


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port :${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();