// modulos
const http = require('http');
const url = require('url');
const fs = require('fs');

//1. servidor
http
    .createServer((req,res) =>{
        const params = url.parse(req.url,true).query;
        const archivo = params.archivo;
        const contenido = params.contenido;
        const nombre = params.nombre;
        const nuevoNombre = params.nuevoNombre;
        const fechaDelDia = new Date();
        const fecha = `${fechaDelDia.getDate()}/0${fechaDelDia.getMonth()+1}/${fechaDelDia.getFullYear()}`;

        // 2. crear
        if (req.url.includes('/crear')) {
            fs.writeFile(archivo,`${fecha}\n${contenido}`,'utf8',() => {
                res.write(`Archivo ${archivo} creado con exito, Felicidades!`);
                res.end();
            })
        }

        // 3. leer
        if (req.url.includes('/leer')) {
            fs.readFile(archivo,'utf8',(err,data) => {
                res.write(`El archivo ${archivo} fue leido con exito, ${data}`);
                res.end();
            })
        }

        //4. renombrar
        if (req.url.includes('/renombrar')) {
            fs.rename(nombre,nuevoNombre,(err,data) => {
                res.write(`El archivo con nombre: ${nombre}, fue renombrado como: ${nuevoNombre}`);
                res.end();
            })
        }

        // 5. eliminar
        if (req.url.includes('/eliminar')) {
            fs.unlink(archivo,(err,data) => {
                res.write(`El archivo ${archivo} fue eliminado con exito. ¡Felicidades!`);
                res.end();
            })
        }

    })
    .listen(8080, () => {console.log('Escuchando en el puerto 8080 con exito!')});