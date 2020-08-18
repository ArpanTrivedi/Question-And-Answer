require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./router/user");
const questionRoutes = require("./router/questions");
const answerRoutes = require("./router/answer");


//mongo connection
var mongoose = require('mongoose');
var mongoDB = process.env.DATABASE;

//db connection
mongoose
    .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true })
    .then(()=>console.log(`DB CONNECTED`))
    .catch(err=>console.log("Database Isn't connected "+err));



//use of middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


//Routers
app.use("/api",userRoutes);
app.use("/api",questionRoutes);
app.use("/api",answerRoutes);





//connection to the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port`);
});