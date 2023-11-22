// Servidor de Express
const express  = require('express');
const http     = require('http');
const path     = require('path');
const cors     = require('cors')

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );
        
        
       
    }

    

    middlewares() { // Funciones que se ejecutan antes que otras
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        //TODO CORS permitir peticiones
        this.app.use(cors())

        //Parsear Body del request
        this.app.use(express.json({ limit: '15mb' }))
        this.app.use(express.urlencoded({ extended: true }));
        
    
        const corsOptions = {
        origin: (origin, callback) => {
            if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
            } else {
            callback(new Error('Origin not allowed by CORS'));
            }
        },
        };


        this.app.options('*', cors(corsOptions));



        //API ENDPOINTS
         this.app.use('/api', require('../router/auth'))
  
    }


    execute() {

        // Inicializar Middlewares
        this.middlewares();

    
        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
        
    }

}


module.exports = Server;