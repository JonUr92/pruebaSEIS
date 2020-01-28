const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const corsOptions = {
}

const app = express()

app.set("port", process.env.PORT || 3000)

//Middleware
app.use(morgan("dev"))
app.use(express.json())

//Static Files

//Routes
app.get('/', function(req, res) {
    res.status(200).json({error: 501})
});
app.use("/api/products",cors(corsOptions),require("./routes/products/products")) //PRODUCTS
app.use("/api/bodegas",cors(corsOptions),require("./routes/bodegas/bodegas")) //BODEGAS

//Server Listenig
app.listen(app.get("port"),()=>{
    console.log("listen to port "+app.get("port"))
})