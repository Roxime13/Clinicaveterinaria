
import React from 'react';
import {Col, Row} from "reactstrap";
import HeaderClinica from './pages/HeaderClinica'
import Navbar from './pages/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Clientes from './pages/Clientes/Clientes'
import ListaClientes from './pages/Clientes/ListaClientes'
import EditarCliente from './pages/Clientes/EditarCliente';
import Mascotas from './pages/Mascotas/Mascotas';
import ListaMascotas from './pages/Mascotas/ListaMascotas';
import EditarMascota from './pages/Mascotas/EditarMascota';
import Tratamientos from './pages/Tratamientos/Tratamientos';
import ListaTratamientos from './pages/Tratamientos/ListaTratamientos';
import EditarTratamiento from './pages/Tratamientos/EditarTratamiento';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default function App() {  
  
  return (
    <div>
      <HeaderClinica/>
      <Row> 
     {/* <Col lg='20'> */}
      <Col lg='2'>
          <Navbar/>
      </Col>
      <Col lg='10'>
        
        <Router>

        <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/pages/Clientes/Clientes' element={<Clientes/>}/>
        <Route exact path='/pages/Clientes/ListaClientes' element={<ListaClientes
        />}/>
        <Route exact path='/EditarCliente/:id' element={<EditarCliente />} />
        <Route exact path='/pages/Mascotas/Mascotas' element={<Mascotas/>}/>
        <Route exact path='/pages/Mascotas/ListaMascotas' element={<ListaMascotas/>}/>
        <Route exact path='/EditarMascota/:id' element={<EditarMascota/>} />
        <Route exact path='/pages/Tratamientos/Tratamientos' element={<Tratamientos/>}/>
        <Route exact path='/pages/Tratamientos/ListaTratamientos' element={<ListaTratamientos/>}/>
        <Route exact path='/EditarTratamiento/:id' element={<EditarTratamiento/>}/>
        </Routes>
        </Router>
        </Col>
        {/* </Col> */}
    </Row>
    </div>
   
    
  );

}



