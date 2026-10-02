const express = require('express');
const dotenv = require('dotenv');
const fileRoute = require('./routes/fileRoute')

dotenv.config({path:'./config.env'});

const app = express();

app.set("view engine", "ejs");

app.use(express.json());

app.get('/', (req, res) => {
    // res.send("<h1>This server is runing.....</h1>");
    res.render('index', {
    files: []
});
});

app.use('/api/file',fileRoute);

const port = 3000 || process.env.PORT
const server = app.listen(port,()=>{
    console.log("This server is runing.....")
})