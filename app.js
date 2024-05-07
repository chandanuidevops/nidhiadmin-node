const express = require('express'); //Import the express dependency
const app = express()

require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(bodyParser.json());

// const { Connection } = require('./db')
const routes = require('./routes/index')



//db
// Connection.open()

//api routes
app.use(cors({
    origin: '*'
}));
app.use(express.json())
app.use('/api/',routes)

app.get('/', function (req, res) {
    
    res.send("Hello myapp!")
 })

app.listen(process.env.Port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${process.env.Port}`); 
});
module.exports = app;