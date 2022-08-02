const mysql = require('mysql')

const conectarse = ()=>{
    var connection = mysql.createConnection({
        host:'localhost',
        user:'proyectofinal',
        password:'123456',
        database:'proyectofinal',
    })
    connection.connect(err=>{
        if(err) throw(err); 
        console.log('Conectado!!')
    })
    return connection;
}

const obtenerDatos = (nombreTabla) => {
    //creamos una constante con el codigo SQL  
    var sql = `SELECT * FROM ${nombreTabla}`
    return new Promise((resolve, reject) => {
        let connection = conectarse();    
        connection.query(sql, (err, resultado) =>{
            if (err) reject(err);
            connection.end();
            resolve(resultado);
        })
    })
}

const obtenerId = (nombreTabla,id)=>{
    var sql = `SELECT * FROM ${nombreTabla} WHERE id=${id}`
    return new Promise((resolve,reject)=>{

        // var sql=`SELECT * FROM datos WHERE id=${id}`//seleccionar una id del usuari
        var connection = conectarse()
        connection.query(sql, (err, resultado)=>{
            if(err) reject(err);
            connection.end()
            resolve(resultado)
        })
})}


const agregarDatosclientes = (clientes)=>{
    let{nombre, primer_Apellido, segundo_Apellido, edad, poblacion, direccion, telefono, correo} = clientes
    let sql = ''
    if(!segundo_Apellido && !telefono){
        sql = `INSERT INTO clientes (nombre, primer_Apellido, edad, poblacion, direccion, correo) VALUES ('${nombre}', '${primer_Apellido}',  '${edad}', '${poblacion}', '${direccion}', '${correo}')`;
    }else if(!segundo_Apellido){
        //se hace un condicional para dependiendo si se ha escrito el segundo_Apellido o no, nos dé un resultado o otro
        sql = `INSERT INTO clientes (nombre, primer_Apellido, edad, poblacion, direccion, telefono, correo) VALUES ('${nombre}', '${primer_Apellido}', '${edad}', '${poblacion}', '${direccion}', '${telefono}', '${correo}')`;
    }else if(!telefono){
            sql = `INSERT INTO clientes (nombre, primer_Apellido, segundo_Apellido, edad, poblacion, direccion, correo) VALUES ('${nombre}', '${primer_Apellido}', '${segundo_Apellido}', '${edad}', '${poblacion}', '${direccion}', '${correo}')`;
    }else{
        sql = `INSERT INTO clientes (nombre, primer_Apellido, segundo_Apellido, edad, poblacion, direccion, telefono, correo) VALUES ('${nombre}', '${primer_Apellido}', '${segundo_Apellido}', '${edad}', '${poblacion}', '${direccion}', '${telefono}', '${correo}')`;
    }
    return new Promise((resolve,reject)=>{
    //crearem una constant amb el codi SQL
        var connection = conectarse()
        connection.query(sql, (err, resultado)=>{
            if(err) reject (err)
            connection.end()
            resolve(resultado)
    
    })
 })}

 const agregarDatosMascotas = (Mascotas)=>{
    let{nombre, especie, edad, sexo, id_fk} = Mascotas
    let sql = ''
    sql = `INSERT INTO Mascotas (nombre, especie, edad, sexo, id_fk) VALUES ('${nombre}', '${especie}','${edad}','${sexo}',${id_fk})`;
    return new Promise((resolve,reject)=>{
    //crearem una constant amb el codi SQL
        var connection = conectarse()
        connection.query(sql, (err, resultado)=>{
            if(err) reject (err)
            connection.end()
            resolve(resultado)
    
    })
 })}

 const agregarDatosTratamientos = (Tratamientos)=>{
    let{nombre_veterinario, sintomas,id_fkmascotas} = Tratamientos
    let sql = ''
    sql = `INSERT INTO Tratamientos (nombre_veterinario, sintomas, id_fkmascotas) VALUES ('${nombre_veterinario}', '${sintomas}',${id_fkmascotas})`;
    return new Promise((resolve,reject)=>{
    //crearem una constant amb el codi SQL
        var connection = conectarse()
        connection.query(sql, (err, resultado)=>{
            if(err) reject (err)
            connection.end()
            resolve(resultado)
    
    })
 })}

 const modificarDatos = (modificarUsuari,id)=>{
    let{ nombre, primer_Apellido, segundo_Apellido, edad, poblacion, direccion, telefono, correo} = modificarUsuari
    let sql = ''
    if(!segundo_Apellido && !telefono){
        sql = `UPDATE clientes SET  nombre='${nombre}', primer_Apellido='${primer_Apellido}', segundo_Apellido=${segundo_Apellido}, edad='${edad}', poblacion='${poblacion}', direccion='${direccion}', telefono=${telefono}, correo='${correo}' WHERE id=${id}`;
    }else if(!segundo_Apellido){
        //se hace un condicional para dependiendo si se ha escrito el segundo_Apellido o no, nos dé un resultado o otro
        sql = `UPDATE clientes SET nombre='${nombre}', primer_Apellido='${primer_Apellido}', segundo_Apellido=${segundo_Apellido}, edad='${edad}', poblacion='${poblacion}', direccion='${direccion}', telefono='${telefono}', correo='${correo}' WHERE id=${id}`;
    }else if(!telefono){
            sql = `UPDATE clientes SET  nombre='${nombre}', primer_Apellido='${primer_Apellido}', segundo_Apellido='${segundo_Apellido}', edad='${edad}', poblacion='${poblacion}', direccion='${direccion}', telefono=${telefono}, correo='${correo}' WHERE id=${id}`;
    }else{
        sql = `UPDATE clientes SET  nombre='${nombre}', primer_Apellido='${primer_Apellido}', segundo_Apellido='${segundo_Apellido}', edad='${edad}', poblacion='${poblacion}', direccion='${direccion}', telefono='${telefono}', correo='${correo}' WHERE id=${id}`;
    }
    return new Promise((resolve,reject)=>{
        var connection = conectarse()
        connection.query(sql,(err, resultado)=>{
            if(err) reject (err)
             connection.end()
            resolve(resultado)
    })
})}
const modificarDatosMascotas = (modificarMascota,id)=>{
    let{nombre,especie,edad,sexo } = modificarMascota
    let sql = ''
    sql = `UPDATE Mascotas SET nombre='${nombre}', especie='${especie}', edad='${edad}', sexo='${sexo}' WHERE id=${id}`;
    return new Promise((resolve,reject)=>{
        var connection = conectarse()
        connection.query(sql,(err, resultado)=>{
            if(err) reject (err)
             connection.end()
            resolve(resultado)
    })
})}

const modificarDatosTratamientos = (modificarTratamiento,id)=>{
    let{nombre_veterinario,sintomas,} = modificarTratamiento
    let sql = ''
    sql = `UPDATE Tratamientos SET nombre_veterinario='${nombre_veterinario}', sintomas='${sintomas}' WHERE id=${id}`;
    return new Promise((resolve,reject)=>{
        var connection = conectarse()
        connection.query(sql,(err, resultado)=>{
            if(err) reject (err)
             connection.end()
            resolve(resultado)
    })
})}
 const borrarDatos = (nombreTabla,id)=>{
    var sql=`DELETE FROM ${nombreTabla} where id=${id}`
    return new Promise((resolve, reject)=>{
        var connection = conectarse()
        connection.query(sql, (err, resultado)=>{
            if(err) reject (err)
            connection.end()
            resolve(resultado)
})
})}

 module.exports.obtenerDatos = obtenerDatos;
 module.exports.obtenerId = obtenerId;
 module.exports.agregarDatosclientes = agregarDatosclientes;
 module.exports.agregarDatosMascotas = agregarDatosMascotas;
 module.exports.agregarDatosTratamientos = agregarDatosTratamientos;
 module.exports.modificarDatosTratamientos = modificarDatosTratamientos;
 module.exports.modificarDatos = modificarDatos;
 module.exports.modificarDatosMascotas = modificarDatosMascotas;
 module.exports.borrarDatos = borrarDatos;

 