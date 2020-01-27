const mysql = require("mysql")
exports.connect = (objectConnection) => {
    objectConnection = {
        host: "localhost",
        user: "root",
        password: "",
        database : "pruebaseis"
    }
    let connection = mysql.createConnection(objectConnection)
    return connection
}
exports.select = (sQuery,aParams,connection) => {
    return new Promise((resolve, reject) => {
        connection.query(
            {
                sql: sQuery,
                values: aParams
            },
            (err, rows) => {
                let toReturn = {
                    result: true,
                    error: '',
                    data: []
                }
                if(err){
                    toReturn.result = false
                    toReturn.error = err
                }else{
                    toReturn.data = JSON.parse(JSON.stringify(rows))
                }
                resolve(toReturn)
            }
        )
    })
}
exports.query = (sQuery,aParams,connection) => {
    return new Promise((resolve, reject) => {
        connection.query(
            {
                sql: sQuery,
                values: aParams
            },
            (err, rows) => {
                let toReturn = {
                    result: true,
                    error: ''
                }
                if(err){
                    toReturn.result = false
                    toReturn.error = err
                }
                resolve(toReturn)
            }
        )
    })
}
exports.closeConnection = (connection) => {
    return new Promise((resolve, reject) => {
        connection.end(err => {
            let toReturn = {
                result: true,
                error: ''
            }
            if(err){
                toReturn.result = false
                toReturn.error = err
            }
            resolve(toReturn)
        })
    })
}