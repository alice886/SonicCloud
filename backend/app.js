const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express(); // initialize Express application

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

const { ValidationError } = require('sequelize');

if (!isProduction) app.use(cors());
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && 'Lax',
            httpOnly: true
        }
    })
)

const routes = require('./routes');
app.use(routes);

// phase 2 -- Error Handling
// 1/3 Resource Not Found Error-Handler
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});
// 2/3 Sequelize Error-Handler
// const { ValidationError } = require('sequelize');
app.use((err, _req, _res, next) => {
    // app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
        err.errors = err.errors.map(e => e.message);
        err.title = 'Validation error';
    }
    next(err);
});
// 3/3 Error Formatter Error-Handler
app.use((err, _req, res, _next) => {
    // app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});






module.exports = app
