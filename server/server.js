'use strict';

import './utils/config.js';

import bodyParse from 'body-parser';
import cors from 'cors';
import express from 'express';
import {router as indexRouter} from './routes/index.js';
import logger from 'morgan';
import loggerCustom from './utils/logger.js';
import mongoose from 'mongoose';
import {router as questionsRouter} from './routes/questions.js';

// Connect mongoose
mongoose.connect(process.env.MONGODBURI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false} );

// Initialize app 
const app = express();
const port = process.env.PORT || 3030;

// Middlewares
app.use(logger('dev'));
app.use(bodyParse.json())

var allowedOrigins = ['http://localhost:3000'];
app.use(cors({
    origin: function(origin, callback){    // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);    if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }    return callback(null, true);
    }
  }));

// Routes 
app.use('/', indexRouter);
app.use('/questions', questionsRouter);

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('ENV') === 'development' ? err: {
        message: 'Internal server Error'
    };
    // default internal server error
    const status = error.status || 500;

    // Respond to client
    res.status(status).json({
        error: {
            message: error.message,
        },
        status: status
    })

    // Respond to ourselves
    loggerCustom.error(err);
});


// Run app
app.listen(port, 
        err => {(err) => {return logger.error('ERROR ', err)}
    loggerCustom.info(`Listening on port ${port}`);
});


