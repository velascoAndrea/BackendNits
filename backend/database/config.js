const mysql = require('mysql')
const { database } = require('./keys');

const dbConnection = mysql.createPool(database);


dbConnection.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS')
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED')
        }
    }
    if(connection)
        connection.release();
        console.log("DB IS CONNECTED");
    

    return;
    
})

module.exports = {
    dbConnection
}
