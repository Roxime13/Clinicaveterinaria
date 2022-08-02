

function Navbar(){
    return (
      <nav class="navbar navbar-fixed ms-auto mb-2 mb-lg-0 w-25  navbar-dark bg-primary">
 <div class="container-fluid">
  <a class="navbar-brand" href="#holi">Bienvenid@!</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav"  aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="main_nav">
	<ul class="navbar-nav">
		<li class="nav-item dropdown">
		   <a class="nav-link  dropdown-toggle" href="bajar" data-bs-toggle="dropdown"> Clientes  </a>
		    <ul class="dropdown-menu">
			  <li><a class="dropdown-item" href="Lista1"> Lista de Clientes </a></li>
			  <li><a class="dropdown-item" href="crearusuario"> Añadir Cliente </a></li>
		    </ul>
		</li>
    <li class="nav-item dropdown">
		   <a class="nav-link  dropdown-toggle" href="bajar" data-bs-toggle="dropdown"> Mascotas  </a>
		    <ul class="dropdown-menu">
			  <li><a class="dropdown-item" href="Lista1"> Lista de mascotas </a></li>
			  <li><a class="dropdown-item" href="crearusuario"> Añadir mascota </a></li>
		    </ul>
		</li>
    <li class="nav-item dropdown">
		   <a class="nav-link  dropdown-toggle" href="bajar" data-bs-toggle="dropdown">Tratamiento </a>
		    <ul class="dropdown-menu">
			  <li><a class="dropdown-item" href="Lista1">Lista de tratamientos </a></li>
			  <li><a class="dropdown-item" href="crearusuario"> Añadir tratamiento </a></li>
		    </ul>
		</li>
	</ul>
  </div> 
 </div> 
</nav>
    )}
  
     /* segundo container fluid para mascotas y el tercero para tratamiento,
     dentro de cada uno debe haber un apartado para que salga el formulario o la lista...
     enviar a los diferentes componentes según donde clickas(?)*/
  
    
export default Navbar