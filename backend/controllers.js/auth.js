 const { response } = require("express");
 const {dbConnection} = require('../database/config')
 const { promisify } = require('util')
const {ingresarbitacora} = require("../helpers/bitacorabd")

dbConnection.query = promisify(dbConnection.query);

const validarNit = async(req,res)=>{

    const {nit} = req.body;
    console.log(nit)
    try {
        // Verificar si nit es nulo o indefinido
        if (!nit) {
            
            return res.status(400).json({
                valido: false,
                mensaje: "El campo NIT no fue proporcionado o es inválido"
            });
        }

        // Verificar si nit es 'Consumidor Final'
        if (nit.toUpperCase() === 'CF' || nit.toUpperCase() === 'CONSUMIDOR FINAL') {
            ingresarbitacora('CONSUMIDOR FINAL',true,"")
            return res.json({
                valido: true,
                mensaje: "Número de NIT válido para Consumidor Final"
            });
        }

        // Verificar la longitud de nit si es una cadena
        if (typeof nit === 'string' && (nit.length > 10 || nit.length < 6)) {
            ingresarbitacora(nit,false,"El número de NIT debe tener entre 6 y 10 caracteres")
            return res.status(400).json({
                valido: false,
                mensaje: "El número de NIT debe tener entre 6 y 10 caracteres"
            });
        } else {
            ingresarbitacora(nit,true,"")
            res.json({
                valido: true,
                mensaje: "Número de NIT válido"
            });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Hable con el Administrador"
        });
    }

}

const ListarNits = async(req,res)=>{
    try{
        const obtenerUsuarioQuery = 'SELECT nit, valido, err FROM bitacora ORDER BY id DESC LIMIT 10;';
        dbConnection.query(obtenerUsuarioQuery, async (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({
                    ok: false,
                    msg: "Error al listar NITs",
                });
            } else {
                // Procesar cada resultado para ajustar los valores de 'valido' y omitir 'err' si no es necesario
                const nitsProcesados = results.map(nit => {
                    nit.valido = nit.valido === 1; // Convierte 0 en false y 1 en true
                    if (nit.valido) {
                        delete nit.err; // Elimina el campo 'err' si 'valido' es true
                    }
                    return nit;
                });

                res.json({
                    nits: nitsProcesados,
                });
            }

         });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Hable con el Administrador"
        });
    }

}



const ValidarTarjeta = async(req,res)=>{
    try{
        const { tarjeta } = req.body;

        if (!tarjeta) {
            return res.status(400).json({
                ok: false,
                mensaje: "No se proporcionó el número de tarjeta"
            });
        }

        const esValida = validarNumeroLuhn(tarjeta);

        if (esValida) {
            res.json({
                valido: true,
                mensaje: "Número de tarjeta válido"
            });
        } else {
            res.status(400).json({
                valido: false,
                mensaje: "Número de tarjeta inválido"
            });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Hable con el Administrador"
        });
    }

}

function validarNumeroLuhn(numeroTarjeta) {
    let suma = 0;
    let alternar = false;
    for (let i = numeroTarjeta.length - 1; i >= 0; i--) {
        let d = parseInt(numeroTarjeta.charAt(i), 10);
        if (alternar) {
            d *= 2;
            if (d > 9) d -= 9;
        }
        suma += d;
        alternar = !alternar;
    }
    return (suma % 10) === 0;
}

module.exports = {
    validarNit,
    ListarNits,
    ValidarTarjeta 
}