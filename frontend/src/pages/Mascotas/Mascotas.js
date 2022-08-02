import { useState} from 'react';
import React from 'react'; 
import {faPersonCirclePlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
function Mascotas(){
    // const[clientes, setClientes]=useState([])
    const [nombre, setNombre] = useState('');
    const [especie, setEspecie] = useState('Perro');
    const [edad, setEdad] = useState('');
    const [sexo, setSexo] = useState('');
    const [id_fk, setId_fk] = useState('');

    
    const handleSubmit = async(e) => {
      e.preventDefault();
      
      const url = 'http://localhost:3005/api/mascotas'
      const mascotes= {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            nombre:nombre,
            especie:especie,
            edad:edad,
            sexo:sexo,
            id_fk:id_fk
        })
      };

      let response = await fetch(url, mascotes)
        console.log(response)
        if (response.status === 200) {
          console.log(response);
          alert("Se ha creado la mascota")

      setNombre('')
      setEspecie('Perro')
      setEdad('')
      setSexo('')
      setId_fk('')
    };
  }
   
  
        return ( 
          <div className="m-auto w-50 mt-5">
            {/* <p className="text-center">Añade clientes y</p>
            <span className="text-primary w-50"> modifica</span> */}
          <h1 className="text-center  bg-success text-white   mx-5">
            Formulario Mascotas</h1>
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
                      <label htmlFor = "especie"
                            className = "fw-bold" >Especie </label> 
                            <br></br>
                      
                            <select required className = "form-control" value = {especie} 
                                onChange = {(e) => setEspecie(e.target.value)}>
                                    <option className = "form-control" value= "Perro">Perro</option>
                                    <option className = "form-control" value = "Gato">Gato</option>
                                    <option className = "form-control" value = "Pez">Pez</option>
                                    <option className = "form-control" value = "Pájaro">Pájaro</option>
                                    <option className = "form-control" value = "Hámster">Hámster</option>
                                    <option className = "form-control" value = "Conejo">Conejo</option>
                                </select>
                      </div> 
                  </div>
                  <div className = "row g-3" >
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
                      <div className = "col-md-4" >
                      <label htmlFor = "sexo" className="fw-bold">Sexo</label>
                            <input required type = "text"
                            className = "form-control"
                              id = "sexo"
                              value={sexo}
                              onChange={(e)=> 
                                setSexo(e.target.value)
                              }
                              />
                      </div> 
                      <div className="col-md-4">
                      <label htmlFor = "id_fk"
                              className = "fw-bold" > Id del propietario </label>
                              <input required className = "form-control"
                              id = "id_fk"
                              name = "id_fk"
                              type = "number"
                              value = {
                                id_fk
                              }
                              onChange = {
                                (e) => setId_fk(e.target.value)
                              }
                              /> 
                      </div>
                  </div>
                      <div className="d-grid gap-2 col-6 mx-auto">
                          <button type="submit" className=" mt-3 btn btn-primary w-25 m-auto"><FontAwesomeIcon icon={faPersonCirclePlus}/></button>
                      </div>
              </form>
          </div>     
  )}

export default Mascotas