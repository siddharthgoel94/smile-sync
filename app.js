require("dotenv").config();
require('express-async-errors');

const connectDB = require("./db/connect");
const express = require("express");
const cors = require('cors')
const app = express();
const mainRouter = require("./routes/user");
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
// const {predict} = require('./mlModel');

app.use(express.json());

app.use(cors())
// app.use(bodyParser.json());
app.use("/api/v1", mainRouter);

app.post("/predict",(req,res)=>{
    console.log(req.body.body);
    // const inputData = req.body.body;
    // // Use your ML model to make a prediction
    // const prediction = predict(inputData);
    // res.send(prediction);
    const clusterNumber=1;

    res.send({clusterNumber:1});
})
const port = process.env.PORT || 3000;

const start = async () => {

    try {        
        await connectDB(process.env.MONGO_URI);
        server.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })

    } catch (error) {
       console.log(error); 
    }
}

start();

