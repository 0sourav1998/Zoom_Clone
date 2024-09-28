const express = require("express");
const { dbConnection } = require("./Database/config");
const {createServer} = require("node:http");
const {Server} = require("socket.io")
const app = express();
const cors = require("cors")
require("dotenv").config();
const userRouter = require("../Backend/routes/userRoute")

app.use(cors());
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({limit : "40kb" , extended :true}))

app.use("/api/v1/user",userRouter)

const server = createServer(app);
const io = new Server(server)

dbConnection();


server.listen(process.env.PORT,()=>{
    console.log(`App is listening to Port : ${process.env.PORT}`)
})