require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = require('./app')
const http = require("http");
const PORT = process.env.PORT || 8080

const server = http.createServer(app)

const DBconnection = process.env.LOCAL  

server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
    mongoose.connect(DBconnection,{
        useNewUrlParser:true,
        useUnifiedTopology : true
    }).then(()=>{
        console.log("Connected to database")
    }).catch((error)=>{
        console.log(`${error} error connecting to the databse`)
    })
})