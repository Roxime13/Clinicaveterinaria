import {useState,useEffect} from 'react';

  import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
  import {useNavigate} from "react-router-dom"
  import {faFloppyDisk} from '@fortawesome/free-solid-svg-icons';
  import {useParams} from 'react-router-dom';
  
const EditarTratamiento = () => {
      const {id} = useParams()
      const [nombre_veterinario, setNombre_veterinario] = useState('');
      const [sintomas, setSintomas] = useState('');
      const nav = useNavigate()
      
    useEffect(()=>{
      dameTratamientosId(id).then(tratamiento=> {
        setNombre_veterinario(tratamiento[0].nombre_veterinario)
        setSintomas(tratamiento[0].sintomas)
      }).catch(console.error)
    },[id])
  
      async function dameTratamientosId(id) {
        const options = {
          type: "GET",
        }
  
        try {
  
          let data = await fetch(`http://localhost:3005/api/tratamientos/${id}`, options)
  
  
          if (data.status === 200) {
            const tratamientos = await data.json()
            console.log("clientes", tratamientos)
            return tratamientos;
     
  
          } else {
            console.log("No he recibido la mascota")
            return []
          }
  
        } catch (err) {
          console.log(err)
        }
      }
  
  
      const handleSubmit = async(e) => {
        e.preventDefault();
        const url = `http://localhost:3005/api/tratamientos/${id}`
        const tratamiento = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre_veterinario: nombre_veterinario,
            sintomas:sintomas,
          })
        };
        console.log(tratamiento)
        let response = await fetch(url, tratamiento)
        if (response.status === 200) {
          nav('/pages/Tratamientos/ListaTratamientos')
        } else {
          console.log(tratamiento)
        }
  
      };
  
  
      return ( 
                <div className="m-auto w-50 mt-5">
                {/* <p className="text-center">Añade clientes y</p>
                <span className="text-primary w-50"> modifica</span> */}
            <h1 className="text-center  bg-warning text-white   mx-5">
                Editar tratamiento</h1>
            
            
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
                <button type="submit" className=" mt-3 btn btn-success w-25 m-auto"><FontAwesomeIcon icon={faFloppyDisk}/></button>
            </form>
            </div>    
        );
}
export default EditarTratamiento;