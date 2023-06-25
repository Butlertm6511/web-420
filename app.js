// Imports
const express = require('express');
const http = require('http');
const mongoose = require('mongoose')
const swaggerUi = require ('swagger-ui-express')
const swaggerJsdoc = require ('swagger-jsdoc');
const { start } = require('repl');

//Assigned variable

let app = express();

// const path = require('path');
               

const port = process.env.PORT || 3002;


// EJS as View Engine

app.use(express.json())
app.use(express.urlencoded({'extended': true}));


//cont MongoDB Atlas connection string








const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);






// wiring swaggerSpec variable

app.use('/api-doc',swaggerUi.serve, swaggerUi.setup(openapiSpecification));


// app.use('/', routes);node npm start


http.createServer(app).listen(app.get('port'), function() {
    console.log(`Application started and listening on port ${app.get('port')}`);
});
