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

app.use(express.json());

app.use(cors())
// app.use(bodyParser.json());
app.use("/api/v1", mainRouter);

app.post("/predict",(req,res)=>{
    console.log(req.body.body);
    res.send(req.body.body);
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

