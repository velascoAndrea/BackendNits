const { validationResult } = require("express-validator");

const validarCampos = (req,res,next) => { // next sirve para llamar al siguiente middleware
    const errores = validationResult(req)

    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errores.mapped() //funcion de validationResult
        })
    }

    next();
}

module.exports ={
    validarCampos
}