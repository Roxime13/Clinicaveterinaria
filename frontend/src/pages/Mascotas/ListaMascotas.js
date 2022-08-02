import { useState,useEffect} from 'react';
import {Table} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";

 const ListaMascotas=(props)=>{
 const[mascotas, setMascotas]=useState([])

   useEffect(() => { 
    const fetchData = async()=>{
     const mascotas = await dameMascotas()
     setMascotas(mascotas)
    }
    fetchData().catch(console.error);
    

   },[]);
  
   const navigate = useNavigate ();
    const handleClick = (id) => {
      navigate(`/EditarMascota/${id}`)
    }    
  

//useeffect llamar a la función
    async function dameMascotas(){
        const options = {
          type: "GET",
        }

        try{
          let data = await fetch( 'http://localhost:3005/api/mascotas',options)
          
              if(data.status===200){
                const mascotas=await data.json()
                console.log("clientes",mascotas)
                return mascotas
              }
            
              
            }catch(err){
              console.log(err)
            }
    }
      const handleEliminar= async (id)=>{

                  let response = await fetch(`http://localhost:3005/api/mascotas/${id}`, {
                      method: "DELETE",
                  });
                  let jsonResponse = await response.json()
                  console.log(jsonResponse)
                  if(jsonResponse.success){
                    let listaActual = mascotas;
                    let listaActualizada = listaActual.filter(mascota=>mascota.id!==id)
                    console.log(listaActualizada)
                    setMascotas(listaActualizada)
                  }   
        }
      
      return (
        <div className="text-center">
        {mascotas.length>0?(
          <>
            <p className="text-center">Administra las
            <span className="text-blue-700 text-bold"> mascotas</span></p><br/>
            <h2 className="bg-cyan-600 font-bold uppercase block">Lista de mascotas</h2>
            <div className="top-16 scroll h-[200px]">
                  <div className="container mt-4 shadow-lg p3 mb-5 bg-body rounded">
                    <Table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Especie</th>
                          <th>Edad</th>
                          <th>Sexo</th>
                          <th>Id del propietario</th>
                          <th>Editar cliente</th>
                          <th>Eliminar cliente</th>
                        </tr>
                      </thead>
                    {mascotas.map(mascota=>(
                      <tbody>
                          <tr key={mascota.id}>
                              <td>{mascota.nombre}</td>
                              <td>{mascota.especie}</td>
                              <td>{mascota.edad}</td>
                              <td>{mascota.sexo}</td>
                              <td>{mascota.id_fk}</td>
                              <td><button type="button"className="bt btn-warning" onClick={()=>handleClick(mascota.id)}>
                              
                            <FontAwesomeIcon icon={faEdit}/></button></td> 
                              <td> <button className="btn btn-danger" 
                              type="button" onClick={() => {if(window.confirm('¿Seguro que quieres eliminar el cliente?')){handleEliminar(mascota.id)};}}>
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
        <p className="md:text-center ml-20 ">Añade una mascota y saldrá 
        <span className="text-blue-700 text-bold"
        > la lista</span></p>
        )}
      </div>
      )
  }

export default ListaMascotas