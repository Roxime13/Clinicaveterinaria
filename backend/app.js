const express = require('express');
var bodyParser = require('body-parser');
var Joi = require('@hapi/joi');
var morgan = require('morgan');

var mysql = require('./modulos/mysql_connector');

var app = express()

const port=process.env.PORT || 3005;

app.listen(port,()=>{
    console.log(`Escuchando en el puerto...${port}`)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('tiny'))
const cors = require('cors');
app.use(cors({ origin: true }));


app.get('/',(req, res)=>{
    res.send('Esto está funcionando'); 
})

app.get('/api/clientes', async(req,res)=>{
    console.log("estoy pidiendo clientes")
    
    try{
        const resultado = await mysql.obtenerDatos('clientes'); 
        //con la tabla y salgan los datos
        res.send(resultado);
    } catch(err){
        console.log(err)
    }
});

app.get('/api/mascotas', async(req,res)=>{
    console.log("estoy pidiendo clientes")
    
    try{
        const resultado = await mysql.obtenerDatos('Mascotas'); 
        res.send(resultado);
    } catch(err){
        console.log(err)
    }
});

app.get('/api/tratamientos', async(req,res)=>{
    console.log("estoy pidiendo tratamientos")
    
    try{
        const resultado = await mysql.obtenerDatos('Tratamientos'); 
        res.send(resultado);
    } catch(err){
        console.log(err)
    }
});

app.get('/api/clientes/:id', async (req, res)=>{
    var usuarios = await mysql.obtenerId('clientes',req.params.id);
    if(usuarios.length==0){
        res.status(404).send('El usuario no fue encontrado')
    }else{
    res.send(usuarios);      
    }
})

app.get('/api/mascotas/:id', async (req, res)=>{
    var mascota = await mysql.obtenerId('Mascotas',req.params.id);
    if(mascota.length==0){
        res.status(404).send('El usuario no fue encontrado')
    }else{
    res.send(mascota);      
    }
})

app.get('/api/tratamientos/:id', async (req, res)=>{
    var tratamiento = await mysql.obtenerId('Tratamientos',req.params.id);
    if(tratamiento.length==0){
        res.status(404).send('El usuario no fue encontrado')
    }else{
    res.send(tratamiento);      
    }
})

app.post('/api/clientes', async(req, res)=>{

    const schema=Joi.object().keys({
        nombre:Joi.string().min(3).max(15).required(),
        primer_Apellido:Joi.string().min(3).max(25).required(),
        segundo_Apellido:Joi.optional(),
        edad:Joi.number().required(),
        poblacion:Joi.string().min(3).max(25).required(),
        direccion:Joi.string().min(4).max(30).required(),
        telefono:Joi.optional(),
        correo:Joi.string().email().required()
 })
    const{error,value} = schema.validate({nombre:req.body.nombre, primer_Apellido:req.body.primer_Apellido, 
        segundo_Apellido:req.body.segundo_Apellido,edad:req.body.edad, poblacion:req.body.poblacion, 
        direccion:req.body.direccion, telefono:req.body.telefono, correo:req.body.correo });
    
    if(!error){
                let clients = {
                    nombre:value.nombre,
                    primer_Apellido:value.primer_Apellido,
                    segundo_Apellido:value.segundo_Apellido,
                    edad:value.edad,
                    poblacion:value.poblacion,
                    direccion:value.direccion,
                    telefono:value.telefono,
                    correo:value.correo }
        
                const mensaje = await  mysql.agregarDatosclientes(clients)
                res.send(clients); 
    }else{
       const mensaje = error.details[0].message
       console.log(error)
        res.status(400).send(mensaje)
    }
})

app.post('/api/mascotas', async(req, res)=>{
    console.log(req.body)
    const schema=Joi.object().keys({
        nombre:Joi.string().min(3).max(15).required(),
        especie:Joi.string().min(3).max(15).required(),
        edad:Joi.number().required(),
        sexo: Joi.string().min(3).max(15).required(),
        id_fk:Joi.number().required(),
 })
    const{error,value} = schema.validate({nombre:req.body.nombre, especie:req.body.especie,edad:req.body.edad, 
        sexo:req.body.sexo, id_fk:req.body.id_fk});
    
    if(!error){
                let mascotes = {
                    nombre:value.nombre,
                    especie:value.especie,
                    edad:value.edad,
                    sexo:value.sexo,
                    id_fk:value.id_fk
                 }
                console.log(mascotes)
                const mensaje = await  mysql.agregarDatosMascotas(mascotes)
                res.send(mascotes); 
    }else{
       const mensaje = error.details[0].message
       console.log(error)
        res.status(400).send(mensaje)
    }
})

app.post('/api/tratamientos', async(req, res)=>{
    console.log(req.body)
    const schema=Joi.object().keys({
        nombre_veterinario:Joi.string().min(3).max(20).required(),
        sintomas:Joi.string().min(10).max(500).required(),
        id_fkmascotas:Joi.number().required()
 })
    const{error,value} = schema.validate({nombre_veterinario:req.body.nombre_veterinario, 
        sintomas:req.body.sintomas,  id_fkmascotas:req.body.id_fkmascotas,});
    
    if(!error){
                let tractaments = {
                    nombre_veterinario:value.nombre_veterinario,
                    sintomas:value.sintomas,
                    id_fkmascotas:value.id_fkmascotas
                 }
                console.log(tractaments)
                const mensaje = await  mysql.agregarDatosTratamientos(tractaments)
                res.send(tractaments); 
    }else{
       const mensaje = error.details[0].message
       console.log(error)
        res.status(400).send(mensaje)
    }
})
app.put('/api/clientes/:id',async(req, res)=>{
    console.log(req.body)
    let usuario = await buscarUsuario('clientes',req.params.id);
     if(!usuario){res.status(404).send('El usuario no fue encontrado')}
     const {error,value} = await validarUsuario(req.body.nombre, req.body.primer_Apellido, 
        req.body.segundo_Apellido,req.body.edad,req.body.poblacion, req.body.direccion,
        req.body.telefono, req.body.correo)
     if(error){
        console.log(error)
         const mensaje = error.details[0].message
         res.status(400).send(mensaje)
         return;
     }else{
      
       usuario.nombre = value.nombre,
       usuario.primer_Apellido = value.primer_Apellido,
       usuario.segundo_Apellido = value.segundo_Apellido,
       usuario.edad = value.edad,
       usuario.poblacion = value.poblacion,
       usuario.direccion = value.direccion,
       usuario.telefono = value.telefono,
       usuario.correo = value.correo

       const modificacion = await mysql.modificarDatos(usuario,req.params.id)
        res.send(modificacion);
        
     }
  });

  app.put('/api/mascotas/:id',async(req, res)=>{
    console.log(req.body)
    let mascota = await buscarUsuario('Mascotas',req.params.id);
     if(!mascota){res.status(404).send('El usuario no fue encontrado')}
     const {error,value} = await validarMascota(req.body.nombre, req.body.especie, 
        req.body.edad, req.body.sexo)
     if(error){
        console.log(error)
         const mensaje = error.details[0].message
         res.status(400).send(mensaje)
         return;
     }else{
      
       mascota.nombre = value.nombre,
       mascota.especie = value.especie,
       mascota.edad = value.edad,
       mascota.sexo = value.sexo
      
       const modificacion = await mysql.modificarDatosMascotas(mascota,req.params.id)
        res.send(modificacion);
        
     }
  });

  app.put('/api/tratamientos/:id',async(req, res)=>{
    console.log(req.body)
    let tratamiento = await buscarUsuario('Tratamientos',req.params.id);
     if(!tratamiento){res.status(404).send('El usuario no fue encontrado')}
     const {error,value} = await validarTratamiento(req.body.nombre_veterinario, 
        req.body.sintomas )
     if(error){
        console.log(error)
         const mensaje = error.details[0].message
         res.status(400).send(mensaje)
         return;
     }else{
      
       tratamiento.nombre_veterinario = value.nombre_veterinario,
       tratamiento.sintomas = value.sintomas
      
       const modificacion = await mysql.modificarDatosTratamientos(tratamiento,req.params.id)
        res.send(modificacion);
        
     }
  });

app.delete('/api/clientes/:id', async(req, res)=>{
    let usuario = await buscarUsuario('clientes',req.params.id);
    console.log(usuario)
   if(usuario.length==0){
       res.status(404).send('El usuario no fue encontrado');
       }else{
    
        const eliminarUsuario = await mysql.borrarDatos('clientes',req.params.id)
            if(eliminarUsuario.affectedRows==0){
                res.status(404).send('El usuario no fue encontrado o se ha borrado')
            }else{
                console.log(eliminarUsuario)
                res.send({success: true, data: eliminarUsuario});
            }
       }
   
});

app.delete('/api/mascotas/:id', async(req, res)=>{
    let mascota = await buscarUsuario('Mascotas',req.params.id);
    console.log(mascota)
   if(mascota.length==0){
       res.status(404).send('El usuario no fue encontrado');
       }else{
        const eliminarMascota = await mysql.borrarDatos('Mascotas',req.params.id)
        console.log(eliminarMascota)
            if(eliminarMascota.affectedRows==0){
               res.status(404).send('El usuario no fue encontrado o se ha borrado')
            }else{
                res.send({success: true, data: eliminarMascota});
            }
    }
   
});

app.delete('/api/tratamientos/:id', async(req, res)=>{
    let tratamiento = await buscarUsuario('Tratamientos',req.params.id);
    console.log(tratamiento)
   if(tratamiento.length==0){
       res.status(404).send('El usuario no fue encontrado');
       }else{
    
        const eliminarTratamiento = await mysql.borrarDatos('Tratamientos',req.params.id)
            if(eliminarTratamiento.affectedRows==0){  
                res.status(404).send('El usuario no fue encontrado o se ha borrado')
            }else{
                console.log(eliminarTratamiento)
                res.send({success: true, data: eliminarTratamiento});
            }
        } 
});


async function buscarUsuario(nombretabla,id){
    let data = await mysql.obtenerId(nombretabla,id)
    console.log("Usuario...",data )
    return (data);
 }
 function validarUsuario(nom, cognom1, cognom2, edat, poblacio, dirrecio, telefon, correu ){
    const schema=Joi.object().keys({
        nombre:Joi.string().min(3).max(15).required(),
        primer_Apellido:Joi.string().min(3).max(25).required(),
        segundo_Apellido:Joi.optional(),
        edad:Joi.number().required(),
        poblacion:Joi.string().min(3).max(25).required(),
        direccion:Joi.string().min(4).max(30).required(),
        telefono:Joi.optional(),
        correo:Joi.string().email().required()
    })
    return(schema.validate({nombre:nom, primer_Apellido:cognom1, segundo_Apellido:cognom2, edad:edat,
    poblacion:poblacio, direccion:dirrecio, telefono:telefon, correo:correu }));
}

function validarMascota(nom, especie,edat,sexe){
    const schema=Joi.object().keys({
        nombre:Joi.string().min(3).max(15).required(),
        especie:Joi.string().min(3).max(15).required(),
        edad:Joi.number().required(),
        sexo: Joi.string().min(3).max(15).required(),
       
    })
    return(schema.validate({nombre:nom, especie:especie, edad:edat,
    sexo:sexe }));
}

function validarTratamiento(nom, simptomes){
    const schema=Joi.object().keys({
        nombre_veterinario:Joi.string().min(3).max(20).required(),
        sintomas:Joi.string().min(10).max(500).required(),
    })
    return(schema.validate({nombre_veterinario:nom, sintomas:simptomes, 

     }));
}

