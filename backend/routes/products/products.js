const globalFunctions = require('../../src/js/global.js')
const oDBClass = require("../../src/js/bd.js")
const oProductClass = require("../../src/js/products/products.js")
const express = require('express')
const routes = express.Router()

routes.post('/getProducts', (req,res)=>{
    const aBody = req.body
    console.log(aBody)
    /*
        INICIO PARAMETROS POST/GET
    */
        let sValue = aBody.sValue;
    /*
    FIN PARAMETROS POST/GET
    */
    oProductClass.getProducts(sValue)
    .then(response => {
        res.json(response);
    })
})
routes.get('/getProducts', (req,res)=>{
    const aBody = req.body
    console.log(aBody)
    /*
        INICIO PARAMETROS POST/GET
    */
        let sValue = aBody.sValue;
    /*
    FIN PARAMETROS POST/GET
    */
    oProductClass.getProducts(sValue)
    .then(response => {
        res.json(response);
    })
})
routes.post('/getProduct', (req,res)=>{
    const aBody = req.body
    /*
        INICIO PARAMETROS POST/GET
    */
        let sValue = aBody.sValue;
    /*
    FIN PARAMETROS POST/GET
    */
    oProductClass.getProduct(sValue,'id')
    .then(response => {
        res.json(response);
    })
})
routes.get('/getMediciones', (req,res)=>{
    const aBody = req.body
    oProductClass.getMediciones()
    .then(response => {
        res.json(response);
    })
})
routes.post('/getStockFromProducto', (req,res)=>{
    const aBody = req.body
    /*
        INICIO PARAMETROS POST/GET
    */
        let iIdProducto = aBody.iIdProducto;
    /*
        FIN PARAMETROS POST/GET
    */
    oProductClass.getStockFromProducto(iIdProducto)
    .then(response => {
        res.json(response);
    })
})
routes.post('/addProduct', (req,res)=>{
    const aBody = req.body
    /*
        INICIO PARAMETROS POST/GET
    */
        let sCodigoProducto = aBody.sCodigoProducto;
        let sNombreProducto = aBody.sNombreProducto;
        let sDescripcionProducto = aBody.sDescripcionProducto;
        let iMedicionProducto = aBody.iMedicionProducto;
        let dPrecioProducto = aBody.dPrecioProducto;
    /*
        FIN PARAMETROS POST/GET
    */
    const aParams = [sCodigoProducto,sNombreProducto,sDescripcionProducto,iMedicionProducto,dPrecioProducto];

    let connection = oDBClass.connect()
    connection.connect()
    oProductClass.getProduct(sCodigoProducto,"productos_codigo")
    .then(product => {
        if(product.data.length == 0){
            //connection.beginTransaction()
            const sQuery = "INSERT INTO productos (productos_codigo, productos_nombre, productos_descripcion, productos_medicion, productos_precio, productos_fecha_creacion, productos_fecha_actualizacion) values (?,?,?,?,?,NOW(),NOW())"
            oDBClass.query(sQuery,aParams,connection)
            .then(response=>{
                if(response.error != ""){
                    //connection.commit();
                }else{
                    //connection.rollback();
                }
                console.log(response)
                oDBClass.closeConnection(connection)
                res.json(response)
            })
        }else{
            oDBClass.closeConnection(connection)
            res.json({
                result: false,
                error: "Codigo de producto ya registrado, intente con un Código distinto"
            })
        }
    })
})
routes.post('/updateProduct', (req,res)=>{
    const aBody = req.body
    console.log(aBody)
    /*
        INICIO PARAMETROS POST/GET
    */
        let iIdUpdate = aBody.iIdUpdate;
        let sNombreProducto = aBody.sNombreProducto;
        let sDescripcionProducto = aBody.sDescripcionProducto;
        let iMedicionProducto = aBody.iMedicionProducto;
        let dPrecioProducto = aBody.dPrecioProducto;
    /*
        FIN PARAMETROS POST/GET
    */
    const aParams = [sNombreProducto,sDescripcionProducto,iMedicionProducto,dPrecioProducto,iIdUpdate];

    let connection = oDBClass.connect()
    connection.connect()
    //connection.beginTransaction()
    const sQuery = "UPDATE productos SET productos_nombre = ?, productos_descripcion = ?, productos_medicion = ?, productos_precio = ?, productos_fecha_actualizacion = NOW() WHERE id = ?"
    oDBClass.query(sQuery,aParams,connection)
    .then(response=>{
        if(response.error != ""){
            //connection.commit();
        }else{
            //connection.rollback();
        }
        console.log(response)
        oDBClass.closeConnection(connection)
        res.json(response)
    })
})
routes.post('/deleteProduct', (req,res)=>{
    const aBody = req.body
    /*
        INICIO PARAMETROS POST/GET
    */
        let sValue = aBody.sValue;
    /*
    FIN PARAMETROS POST/GET
    */
    oProductClass.deleteProduct(sValue)
    .then(response => {
        res.json(response);
    })
})
module.exports = routes