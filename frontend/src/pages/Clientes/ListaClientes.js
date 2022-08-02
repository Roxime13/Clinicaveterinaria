import { useState,useEffect} from 'react';
import {Table} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";

 const ListaClientes=(props)=>{
 const[clientes, setClientes]=useState([])

   useEffect(() => { 
    const fetchData = async()=>{
     const clientes = await dameClientes()
     setClientes(clientes)
    }
    fetchData().catch(console.error);
    

   },[]);
  
   const navigate = useNavigate ();
    const handleClick = (id) => {
      navigate(`/EditarCliente/${id}`)
    }    

//useeffect llamar a la función
    async function dameClientes(){
        const options = {
          type: "GET",
        }

      try{
        let data = await fetch( 'http://localhost:3005/api/clientes',options)
        
            if(data.status===200){
              const clientes=await data.json()
              console.log("clientes",clientes)
              return clientes
            }
          
            
          }catch(err){
            console.log(err)
          }
    }
      const handleEliminar= async (id)=>{

                  let response = await fetch(`http://localhost:3005/api/clientes/${id}`, {
                      method: "DELETE",
                  });
                  let jsonResponse = await response.json()
                  console.log(jsonResponse)
                  if(jsonResponse.success){
                    let listaActual = clientes;
                    let listaActualizada = listaActual.filter(cliente=>cliente.id!==id)
                    console.log(listaActualizada)
                    setClientes(listaActualizada)
              
                  }
                 
                  
        }
             
    return (
      <div className="text-center">
      {clientes.length>0?(
        <>
          <p className="text-center">Administra tus
          <span className="text-blue-700 text-bold"> clientes</span></p><br/>
          <h2 className="bg-cyan-600 font-bold uppercase block">Lista de clientes</h2>
          <div className="top-16 scroll h-[540px]">
                <div className="container mt-4 shadow-lg p3 mb-5 bg-body rounded">
                  <Table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Primer_apellido</th>
                        <th>segundo_Apellido</th>
                        <th>Edad</th>
                        <th>Población</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Editar cliente</th>
                        <th>Eliminar cliente</th>
                      </tr>
                    </thead>
                  {clientes.map(cliente=>(
                    <tbody>
                      <tr key={cliente.id}>
                        <td>{cliente.nombre}</td>
                        <td>{cliente.primer_Apellido}</td>
                        <td>{cliente.segundo_Apellido}</td>
                        <td>{cliente.edad}</td>
                        <td>{cliente.poblacion}</td>
                        <td>{cliente.direccion}</td>
                        <td>{cliente.telefono}</td>
                        <td>{cliente.correo}</td>
                        <td><button type="button"className="bt btn-warning" onClick={()=>handleClick(cliente.id)}>
                        
                      <FontAwesomeIcon icon={faEdit}/></button></td> 
                        <td> <button className="btn btn-danger" 
                        type="button" onClick={() => {if(window.confirm('¿Seguro que quieres eliminar el cliente?')){handleEliminar(cliente.id)};}}>
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
          <p className="md:text-center ml-20 ">Añade un cliente y saldrá
          <span className="text-blue-700 text-bold"
          > la lista</span></p>
          )}
        </div>
    )
  }

  export default ListaClientes