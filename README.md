# Backend Server Configuration

## Server Setup
Este backend contiene todo lo necesario para configurar un servidor Express. Para diferentes propósitos, se ofrecen dos modos de inicialización:

- **Modo Normal:** Utilice el comando `npm run start` para iniciar el servidor en el modo de producción.
- **Modo Pruebas:** Para iniciar en modo de desarrollo o pruebas, utilice `npm run dev`.

# Enpoints


![Validar Nits](/backend/IMAGENES/validarnit.png) 
![Get Nits](/backend/IMAGENES/getnits.png) 
![Validar Tarjeta](/backend/IMAGENES/validar-tarjeta.png) 

## Base de Datos MySQL
Para almacenar la información, se utiliza una tabla en una base de datos MySQL. Los pasos para configurar esta base de datos son los siguientes:

1. **Crear Base de Datos:**
   ```sql
   CREATE DATABASE PRUEBA;
   USE PRUEBA;
   CREATE TABLE bitacora (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nit VARCHAR(20),
    valido BOOLEAN,
    err VARCHAR(75)
);
