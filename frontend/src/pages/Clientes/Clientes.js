import { useState} from 'react';
import React from 'react'; 
import {faPersonCirclePlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function Clientes(){
    const [nombre, setNombre] = useState('');
    const [primer_Apellido, setPrimer_Apellido] = useState('');
    const[segundo_Apellido, setSegundo_Apellido] = useState('');
    const [edad, setEdad] = useState('');
    const[poblacion, setPoblacion] = useState('Barcelona');
    const[direccion,setDireccion] = useState('');
    const[telefono, setTelefono] =useState('');
    const[correo, setCorreo] = useState('');

    
    const handleSubmit = async(e) => {
      e.preventDefault();

      const url = 'http://localhost:3005/api/clientes'
      const clientes= {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            nombre:nombre,
            primer_Apellido:primer_Apellido, 
            segundo_Apellido:segundo_Apellido === '' ? null: segundo_Apellido,
            edad:edad,
            poblacion:poblacion,
            direccion:direccion,
            telefono:telefono==='' ? null: telefono,
            correo:correo
        })
      };
       let response = await fetch(url, clientes)
        if (response.status === 200) {
          console.log(response);
          alert("Se ha creado el cliente")

      setNombre('')
      setPrimer_Apellido('')
      setSegundo_Apellido('')
      setEdad('')
      setPoblacion('Barcelona')
      setDireccion('')
      setTelefono('')
      setCorreo('')
    };
  }
   
  
        return ( 
          <div className="m-auto w-50 mt-5">
            {/* <p className="text-center">Añade clientes y</p>
            <span className="text-primary w-50"> modifica</span> */}
          <h1 className="text-center  bg-success text-white   mx-5">
            Formulario Clientes</h1>
         
         
          <form onSubmit={handleSubmit} className="d-grid gap-2 mt-5 mx-auto">
              <div className= "row g-3">
                  <div className="col-md-4">
                      <label htmlFor = "nombre" className="fw-bold">Nombre</label>
                        <input required type = "text"
                        className = "form-control"
                          id = "nombre"
                          value={nombre}
                          onChange={(e)=> 
                            setNombre(e.target.value)
                          }
                          />
                  </div>

                  <div className="col-md-4">
                      <label htmlFor="primer_apellido" className="fw-bold"> Primer Apellido </label>
                          <input required
                          className="form-control" 
                              id="primer_Apellido"
                              name="primer_Apellido"
                              type="text"
                              value={primer_Apellido} 
                              onChange={(e)=>setPrimer_Apellido(e.target.value)}
                              />
                  </div>
              </div>
              <div className = "row g-3" >
                  <div className = "col-md-5" >
                          <label htmlFor = "segundo_apellido"
                          className = "fw-bold" > Segundo Apellido </label>
                          <input className = "form-control"
                          id = "segundo_Apellido"
                          name = "segundo_Apellido"
                          type = "text"
                          onChange = {
                            (e) => setSegundo_Apellido(e.target.value)
                          }
                          value = {
                            segundo_Apellido
                          }

                      /> 
                  </div>
                  <div className = "col-md-4" >
                          <label htmlFor = "edad"
                          className = "fw-bold" > Edad </label>
                          <input required className = "form-control"
                          id = "edad"
                          name = "edad"
                          type = "number"
                          value = {
                            edad
                          }
                          onChange = {
                            (e) => setEdad(e.target.value)
                          }
                          /> 
                  </div>
              </div>
                
              <div className = "row g-3 mb-4" >
                  <div className = "col-md-5" >
                        <label htmlFor = "poblacion"
                        className = "fw-bold" > Población </label> 
                        <br></br>
                  
                        <select required className = "form-control" value = {poblacion}  
                            onChange = {(e) => setPoblacion(e.target.value)}>
                                <option className = "form-control" value = "Barcelona">Barcelona</option>
                                <option className = "form-control" value = "Tarragona">Tarragona</option>
                                <option className = "form-control" value = "Madrid">Madrid</option>
                                <option className = "form-control" value = "Lugo">Lugo</option>
                                <option className = "form-control" value = "Sitges">Sitges</option>
                            </select>
                  </div> 
                  <div className="col-md-7">
                        <label htmlFor="direccion"
                          className="mt-6 flex items-center justify-center space-x-2 text-sm fw-bold"
                          >Dirección</label>
                          <textarea required className="form-control"
                            id="direccion"
                            name="direccion"
                            type="text"
                            value={direccion} 
                            onChange={(e)=>setDireccion(e.target.value)}/> 
                  </div>
              </div>
                  <div className= "row g-3 mb-4">
                      <div className="col-md-6">
                            <label htmlFor="telefono"
                          className="mt-6 flex items-center justify-center space-x-2 text-sm fw-bold"
                          >Teléfono</label>
                          <input className="form-control"
                            id="telefono"
                            name="telefono"
                            type="text"
                            value={telefono} 
                            onChange={(e)=>setTelefono(e.target.value)}/>
                      </div>
                      <div className="col-md-6">
                          <label htmlFor="correo" className="fw-bold">Correo</label>
                              <input required type="email"
                              className="form-control"
                                id="correo"
                                name="correo"
                                value={correo}
                                onChange={(e)=>setCorreo(e.target.value)}/>
                      </div>
                  </div>
                  <div className="d-grid gap-2 col-6 mx-auto">
                      <button type="submit" className=" mt-3 btn btn-primary w-25 m-auto"><FontAwesomeIcon icon={faPersonCirclePlus}/></button>
                  </div>
              </form>
          </div>     
  )}


export default Clientes
  