import { useState} from 'react';
import React from 'react'; 
import {faPersonCirclePlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function Tratamientos(){
    const [nombre_veterinario, setNombre_veterinario] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id_fkmascotas, setId_fkmascotas] = useState('');

    
    const handleSubmit = async(e) => {
      e.preventDefault();
      
      const url = 'http://localhost:3005/api/tratamientos'
      const tractaments= {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            nombre_veterinario:nombre_veterinario,
            sintomas:sintomas,
            id_fkmascotas:id_fkmascotas
        })
      };
        let response = await fetch(url, tractaments)
        if (response.status === 200) {
          console.log(response);
          alert("Se ha creado el tratamiento")
          
      

      setNombre_veterinario('')
      setSintomas('')
      setId_fkmascotas('')
    };
  }
   
  
        return ( 
          <div className="m-auto w-50 mt-5">
            {/* <p className="text-center">Añade clientes y</p>
            <span className="text-primary w-50"> modifica</span> */}
            <h1 className="text-center  bg-success text-white   mx-5">
              Formulario Tratamientos</h1>
          
          
            <form onSubmit={handleSubmit} className="d-grid gap-2 mt-5 mx-auto">
              <div className= "row g-3">
                <div className="col-md-5">
                    <label htmlFor = "nombre" className="fw-bold">Nombre del veterinario</label>
                      <input required type = "text"
                      className = "form-control"
                        id = "nombre"
                        value={nombre_veterinario}
                        onChange={(e)=> 
                          setNombre_veterinario(e.target.value)
                        }
                        />
                </div>

                <div className="col-md-7">
                <label htmlFor="sintomas"
                        className="mt-6 flex items-center justify-center space-x-2 text-sm fw-bold "
                        >Síntomas</label>
                        <textarea required className="form-control"
                          id="sintomas"
                          name="sintomas"
                          type="text"
                          value={sintomas} 
                          onChange={(e)=>setSintomas(e.target.value)}/> 
                </div> 
            </div>
            <div className = "row g-3" >
                <div className = "col-md-4" >
                <label htmlFor = "id_fkmascotas"
                        className = "fw-bold" > Id de la mascota </label>
                        <input required className = "form-control"
                        id = "id_fkmascotas"
                        name = "id_fkmascotas"
                        type = "number"
                        value = {
                          id_fkmascotas
                        }
                        onChange = {
                          (e) => setId_fkmascotas(e.target.value)
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
  export default Tratamientos
