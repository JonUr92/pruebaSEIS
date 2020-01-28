const DB = require("../bd.js")

exports.getProducts = (sValue) => {
    return new Promise((resolve, reject) => {
        let connection = DB.connect()
        connection.connect()
        let sWhere = "";
        let aParams = [];
        if(sValue != ""){
            sWhere = " WHERE productos_codigo = ? OR productos_nombre LIKE '%"+sValue+"%' ";
            aParams = [sValue];
        }
        sValue = connection.escape(sValue);
        const sQuery  = "SELECT * FROM productos "+sWhere+" ;";
        DB.select(sQuery,aParams,connection)
        .then(product=>{
            DB.closeConnection(connection)
            resolve(product)
        })
    })
}
exports.getProduct = (sValue, sField) => {
    return new Promise((resolve, reject) => {
        let connection = DB.connect()
        connection.connect()
        sValue = connection.escape(sValue);
        const query = "SELECT * FROM productos WHERE "+sField+" = "+sValue+";";
        DB.select(query,[],connection)
        .then(product=>{
            DB.closeConnection(connection)
            resolve(product)
        })
    })
}
exports.deleteProduct = (sValue) => {
    return new Promise((resolve, reject) => {
        let connection = DB.connect()
        connection.connect()
        sValue = connection.escape(sValue);
        const query = "DELETE FROM productos WHERE id = "+sValue+";";
        DB.select(query,[],connection)
        .then(product=>{
            DB.closeConnection(connection)
            resolve(product)
        })
    })
}
exports.getMediciones = () => {
    return new Promise((resolve, reject) => {
        let connection = DB.connect()
        connection.connect()
        const query = "SELECT * FROM productos_mediciones;";
        DB.select(query,[],connection)
        .then(product=>{
            DB.closeConnection(connection)
            resolve(product)
        })
    })
}
exports.getStockFromProducto = (iIdProducto) => {
    return new Promise((resolve, reject) => {
        let connection = DB.connect()
        connection.connect()
        const query = "SELECT B.id, B.bodegas_nombre, (SELECT SUM(cant) FROM stock WHERE productos_id = BP.productos_id AND bodegas_id = BP.bodegas_id) as stock FROM bodegas_productos BP INNER JOIN bodegas B ON B.id = bodegas_id WHERE productos_id = ? GROUP BY bodegas_id";
        DB.select(query,[iIdProducto],connection)
        .then(product=>{
            DB.closeConnection(connection)
            resolve(product)
        })
    })
}