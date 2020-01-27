const DB = require("..//bd.js")

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