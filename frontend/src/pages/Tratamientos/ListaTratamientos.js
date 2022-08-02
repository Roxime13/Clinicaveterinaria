import { useState,useEffect} from 'react';
import {Table} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";

const ListaTratamientos=(props)=>{
 const[tratamientos, setTratamientos]=useState([])

   useEffect(() => { 
    const fetchData = async()=>{
     const tratamientos = await dameTratamientos()
     setTratamientos(tratamientos)
    }
    fetchData().catch(console.error);
    

   },[]);
  
   const navigate = useNavigate ();
    const handleClick = (id) => {
      navigate(`/EditarTratamiento/${id}`)
    }    
  

//useeffect llamar a la función
    async function dameTratamientos(){
        const options = {
          type: "GET",
        }

      try{
        let data = await fetch( 'http://localhost:3005/api/tratamientos',options)
        
            if(data.status===200){
              const tratamiento=await data.json()
              console.log("tratamiento",tratamiento)
              return tratamiento
            }
          
            
          }catch(err){
            console.log(err)
          }
    }
      const handleEliminar= async (id)=>{

                  let response = await fetch(`http://localhost:3005/api/tratamientos/${id}`, {
                      method: "DELETE",
                  });
                  let jsonResponse = await response.json()
                  console.log(jsonResponse)
                  if(jsonResponse.success){
                    let listaActual = tratamientos;
                    let listaActualizada = listaActual.filter(tratamiento=>tratamiento.id!==id)
                    console.log(listaActualizada)
                    setTratamientos(listaActualizada)
              
                  }      
        }
      
    return (
      <div className="text-center">
      {tratamientos.length>0?(
        <>
          <p className="text-center">Administra los
          <span className="text-blue-700 text-bold"> tratamientos</span></p><br/>
          <h2 className="bg-cyan-600 font-bold uppercase block">Lista de tratamientos</h2>
          <div className="top-16 scroll h-[200px]">
                <div className="container mt-4 shadow-lg p3 mb-5 bg-body rounded">
                  <Table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Nombre del veterinario</th>
                        <th>Síntomas</th>
                        <th>Id de la mascota</th>
                        <th>Editar cliente</th>
                        <th>Eliminar cliente</th>
                      </tr>
                    </thead>
                  {tratamientos.map(tratamiento=>(
                    <tbody>
                        <tr key={tratamiento.id}>
                            <td>{tratamiento.nombre_veterinario}</td>
                            <td>{tratamiento.sintomas}</td>
                            <td>{tratamiento.id_fkmascotas}</td>
                            <td><button type="button"className="bt btn-warning" onClick={()=>handleClick(tratamiento.id)}>
                            
                          <FontAwesomeIcon icon={faEdit}/></button></td> 
                            <td> <button className="btn btn-danger" 
                            type="button" onClick={() => {if(window.confirm('¿Seguro que quieres eliminar el cliente?')){handleEliminar(tratamiento.id)};}}>
                              <FontAwesomeIcon icon={faTrash}/>
                          </button></td> 
                        </tr> 
                    </tbody>
                  ))}
                  </Table>
                  </div>
        </div>
        </>
      ) : (
      <p className="md:text-center ml-20 ">Añade un tratamiento y saldrá
      <span className="text-blue-700 text-bold"
      > la lista</span></p>
      )}
    </div>
    )
}

export default ListaTratamientos