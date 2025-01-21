const express = require('express');
const Conneted = require('./Config/Server');
const UserRouter = require('./Router/Router');
const cors = require('cors');

const app = express();


app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',  
}));

app.use(express.json({ extended: true })); 
app.use(express.urlencoded({ extended: true }));


app.use("/", UserRouter);


app.listen(9595, () => {
    console.log("Port is Running");
    Conneted(); 
});
