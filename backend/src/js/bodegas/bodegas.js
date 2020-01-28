const DB = require("../bd.js")

exports.getBodegas = (iIdProducto) => {
    return new Promise((resolve, reject) => {
        let connection = DB.connect()
        connection.connect()
        const query = "SELECT * FROM bodegas WHERE id NOT IN (SELECT bodegas_id FROM bodegas_productos WHERE productos_id = ?);";
        console.log(query+iIdProducto)
        DB.select(query,[iIdProducto],connection)
        .then(bodegas=>{
            DB.closeConnection(connection)
            resolve(bodegas)
        })
    })
}
exports.asignarBodega = (iIdProducto,iIdBodega) => {
    return new Promise((resolve, reject) => {
        let connection = DB.connect()
        connection.connect()
        const query = "INSERT INTO bodegas_productos (productos_id, bodegas_id) VALUES (?,?)";
        DB.query(query,[iIdProducto,iIdBodega],connection)
        .then(bodegas=>{
            DB.closeConnection(connection)
            resolve(bodegas)
        })
    })
}