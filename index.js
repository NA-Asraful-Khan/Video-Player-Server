const express = require ('express');
const app = express();
const cors = require('cors');
const { dbConnection } = require('./db/dbConnect');
const {readdirSync} = require('fs')
const path = require('path');
require('dotenv').config();

const servers = path.dirname(require.main.filename)

const PORT = process.env.PORT||8000
//middlewares
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

//routes
readdirSync('./routes').map((route)=> app.use('/api',require('./routes/'+route)))

//server static files

app.use('/public',express.static(path.join(__dirname,'public')))
const server=()=>{
    dbConnection()
    app.listen(PORT,()=>{
        console.log(`Server is listening to http://localhost:${PORT} `)
    })
}

server()

app.get('/',(req,res)=>{
    res.send('Hello'+path.dirname(require.main.filename))
})
