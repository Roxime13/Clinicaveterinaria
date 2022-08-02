import {useState,useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFloppyDisk} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom"
import {useParams} from 'react-router-dom';
  
const EditarMascota = () => {
      const {id} = useParams()
      const [nombre, setNombre] = useState('');
      const [especie, setEspecie] = useState('Perro');
      const [edad, setEdad] = useState('');
      const [sexo, setSexo] = useState('');
      const nav = useNavigate()
  
    useEffect(()=>{
      dameMascotasId(id).then(mascota=> {
        setNombre(mascota[0].nombre)
        setEspecie(mascota[0].especie)
        setEdad(mascota[0].edad)
        setSexo(mascota[0].sexo)
      }).catch(console.error)
    },[id])
  
      async function dameMascotasId(id) {
        const options = {
          type: "GET",
        }
  
        try {
  
          let data = await fetch(`http://localhost:3005/api/mascotas/${id}`, options)
  
  
          if (data.status === 200) {
            const mascotas = await data.json()
            console.log("clientes", mascotas)
            return mascotas
     
  
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
        const url = `http://localhost:3005/api/mascotas/${id}`
        const clientes = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre: nombre,
            especie: especie,
            edad: edad,
            sexo: sexo,
          })
        };
        console.log(clientes)
        let response = await fetch(url, clientes)
        if (response.status === 200) {
          nav('/pages/Mascotas/ListaMascotas')
          
          
         
        } else {
          console.log(clientes)
        }
  
      };
  
  
      return ( 
        <div className="m-auto w-50 mt-5">
        {/* <p className="text-center">Añade clientes y</p>
        <span className="text-primary w-50"> modifica</span> */}
      <h1 className="text-center  bg-warning text-white m-auto w-75 mx-5">
        Formulario Mascotas</h1>
     
     
      <form onSubmit={handleSubmit} className="d-grid gap-2 mt-5 mx-auto">
      <div className= "row g-3">
          <div className="col-md-5">
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

          <div className="col-md-5">
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
          <div className = "col-md-5" >
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
          <div className = "col-md-6" >
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
      </div>
        <button type="submit" className=" mt-3 btn btn-success w-25 m-auto"><FontAwesomeIcon icon={faFloppyDisk}/></button>
          </form>
        </div> 
        );
}
export default EditarMascota;