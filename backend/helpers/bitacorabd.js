const {executeQuery, dbConnection} = require('../database/config')

const ingresarbitacora = async(nit,valido,err) => {
    console.log("Ingresando a la bitacora")
        const result = await dbConnection.query("INSERT INTO bitacora (nit,valido,err) VALUES (?,?,?);",[nit,valido,err]);
        if (result){
            console.log("Se ingresó correctamente")
            
        }else{
            console.log("No se ingresó")
            
        }
    
}

module.exports = {
    ingresarbitacora
}