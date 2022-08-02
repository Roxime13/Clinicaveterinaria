import {
  useState,
  useEffect
} from 'react';

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
  faFloppyDisk
} from '@fortawesome/free-solid-svg-icons';

import {useNavigate} from "react-router-dom"

import {
  useParams
} from 'react-router-dom';




const EditarCliente = () => {
    const {
      id
    } = useParams()
    const [nombre, setNombre] = useState('');
    const [primer_Apellido, setPrimer_Apellido] = useState('');
    const [segundo_Apellido, setSegundo_Apellido] = useState('');
    const [edad, setEdad] = useState('');
    const [poblacion, setPoblacion] = useState('Barcelona');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const nav = useNavigate()
 

  useEffect(()=>{
    dameClientesId(id).then(cliente => {
      setNombre(cliente[0].nombre)
      setPrimer_Apellido(cliente[0].primer_Apellido)
      setSegundo_Apellido(cliente[0].segundo_Apellido)
      setEdad(cliente[0].edad)
      setPoblacion(cliente[0].poblacion)
      setDireccion(cliente[0].direccion)
      setTelefono(cliente[0].telefono)
      setCorreo(cliente[0].correo)
    }).catch(console.error)
  },[id])






    async function dameClientesId(id) {
      const options = {
        type: "GET",
      }

      try {

        let data = await fetch(`http://localhost:3005/api/clientes/${id}`, options)


        if (data.status === 200) {
          const clientes = await data.json()
          console.log("clientes", clientes)
          return clientes

        } else {
          console.log("No he recibido el cliente")
          return []
        }



      } catch (err) {
        console.log(err)
      }
    }


    const handleSubmit = async(e) => {
      e.preventDefault();
      const url = `http://localhost:3005/api/clientes/${id}`
      const clientes = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: nombre,
          primer_Apellido: primer_Apellido,
          segundo_Apellido:segundo_Apellido=== '' ? null : segundo_Apellido, 
          edad: edad,
          poblacion: poblacion,
          direccion: direccion,
          telefono:telefono === '' ? null : telefono,
          correo: correo
        })
      };
      console.log(clientes)
      let response = await fetch(url, clientes)
      if (response.status === 200) {
        nav('/pages/Clientes/ListaClientes')
      } else {
        console.log(clientes)
      }

    };


    return ( 
    <div className = "text-center" >
    
      <div className = "m-auto w-50 mt-5 " >

      <h1 className = "text-center  bg-warning text-white   mx-5" >
      Editar cliente </h1>

      <form onSubmit={handleSubmit} 
      className = "d-grid gap-2 mt-5 mx-auto text-bold" >
      <div className = "row g-3" >

        <div className = "col-md-5" >
              <label htmlFor = "nombre"
              className = "fw-bold" > Nombre </label> 
              <input required type = "text"
              className = "form-control"
              id = "nombre"
              name = "nombre"
              value = {
                nombre
              }
              onChange = {
                (e) => setNombre(e.target.value)
              }
              /> 
        </div>

        <div className = "col-md-5" >
              <label htmlFor = "primer_apellido"
              className = "fw-bold" > Primer Apellido </label> 
              <input required className = "form-control"
              id = "primer_Apellido"
              name = "primer_Apellido"
              type = "text"

              value = {
                primer_Apellido
              }
              onChange = {
                (e) => setPrimer_Apellido(e.target.value)
              }
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
                value = {
                  segundo_Apellido
                }
                onChange = {
                  (e) => setSegundo_Apellido(e.target.value)
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
        <div className = "col-md-7">
            <label htmlFor = "direccion"
            className = "mt-6 flex items-center justify-center space-x-2 text-sm fw-bold" >
            Dirección </label>
            <textarea required className = "form-control"
            id = "direccion"
            name = "direccion"
            type = "text"
            value = {
              direccion
            }
            onChange = {
              (e) => setDireccion(e.target.value)
            }
            /> 
        </div> 
      </div> 
      <div className = "row g-3 mb-4" >
        <div className = "col-md-6" >
            <label htmlFor = "telefono"
            className = "mt-6 flex items-center justify-center space-x-2 text-sm fw-bold" >
            Teléfono </label> 
            <input className = "form-control"
            id = "telefono"
            name = "telefono"
            type = "text"
            pattern = "[0-9]{8,12}"
            value = {
              telefono
            }
            onChange = {
              (e) => setTelefono(e.target.value)
            }
            /> 
        </div> 
        <div className = "col-md-6" >
            <label htmlFor = "correo"
            className = "fw-bold" > Correo </label> 
            <input required type = "email"
            className = "form-control"
            id = "correo"
            name = "correo"
            value = {
              correo
            }
            onChange = {
              (e) => setCorreo(e.target.value)
            }
            /> 
        </div> 
      </div> 
      <button type="submit" className="btn btn-success w-25 m-auto"><FontAwesomeIcon icon={faFloppyDisk}/></button>
        </form>
      </div> 
    </div>
      );
    }
    export default EditarCliente;