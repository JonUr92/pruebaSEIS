const globalFunctions = require('../../src/js/global.js')
const oDBClass = require("../../src/js/bd.js")
const oProductClass = require("../../src/js/bodegas/bodegas.js")
const express = require('express')
const routes = express.Router()

routes.post('/getProducts', (req,res)=>{
    const aBody = req.body
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
routes.post('/getBodegas', (req,res)=>{
    const aBody = req.body
    /*
        INICIO PARAMETROS POST/GET
    */
        let iIdProducto = aBody.iIdProducto;
    /*
        FIN PARAMETROS POST/GET
    */
    oProductClass.getBodegas(iIdProducto)
    .then(response => {
        res.json(response);
    })
})
routes.post('/asignarBodega', (req,res)=>{
    const aBody = req.body
    /*
        INICIO PARAMETROS POST/GET
    */
        let iIdProducto = aBody.iIdProducto;
        let iIdBodegas = aBody.iIdBodega;
    /*
        FIN PARAMETROS POST/GET
    */
    oProductClass.asignarBodega(iIdProducto,iIdBodegas)
    .then(response => {
        res.json(response);
    })
})
routes.post('/addMovimiento', (req,res)=>{
    const aBody = req.body
    console.log(aBody)
    /*
        INICIO PARAMETROS POST/GET
    */
        let iIdProducto = aBody.iIdProducto;
        let iIdBodega = aBody.iIdBodega;
        let iTipoMovimiento = aBody.iTipoMovimiento;
        let iCantidad = aBody.iCantidad;
    /*
        FIN PARAMETROS POST/GET
    */
    const aParams = [iTipoMovimiento,iIdProducto,iIdBodega,iCantidad];

    let connection = oDBClass.connect()
    connection.connect()
    //connection.beginTransaction()
    const sQuery = "INSERT INTO stock (tipo_movimiento, productos_id, bodegas_id, cant, fecha) values (?,?,?,?,NOW())"
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
module.exports = routes