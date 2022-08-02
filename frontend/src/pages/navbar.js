function Navbar(){ 
    return (
	<div className="container-fluid px-0">
    	{/* <div className="row"> */}
			<div className=" px-sm-2  min-vh-100 bg-dark">
				<div>
					{/* className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"> */}
					<a href="/" className="d-flex  pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
						<span className="fs-5 d-none d-sm-inline">Home</span>
					</a>
					<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
						<li>
							<a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
								<img src="https://cdn.pixabay.com/photo/2016/03/31/20/37/client-1295901_960_720.png" width="30" alt="clientes"/>
								<i className="fs-4 bi-speedometer2"></i> 
								<span className="ms-1 d-none d-sm-inline">Clientes</span> </a>
							<ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
								<li className="w-100">
									<a href="/pages/Clientes/ListaClientes" className="nav-link px-0"> 
									<span className="d-none d-sm-inline">Lista de clientes</span> </a>
								</li>
								<li>
									<a href="/pages/Clientes/Clientes" className="nav-link px-0"> 
									<span className="d-none d-sm-inline">Añadir cliente</span></a>
								</li>
							</ul>
						</li>
						<li>
						<a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
						<img src="https://cdn.pixabay.com/photo/2017/03/25/14/26/animals-2173635_960_720.jpg" className="rounded-circle" width="30" alt="mascotas"/>
								<i className="fs-5 bi-speedometer1"></i> <span className="ms-1 d-none d-sm-inline">Mascotas</span></a>
							<ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
								<li className="w-100">
									<a href="/pages/Mascotas/ListaMascotas" className="nav-link px-0"> 
									<span className="d-none d-sm-inline">Lista de mascotas</span></a>
								</li>
								<li>
									<a href="/pages/Mascotas/Mascotas" className="nav-link px-0">
										 <span className="d-none d-sm-inline">Añadir mascota</span></a>
								</li>
							</ul>
						</li>
						<li>
							<a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
							<img src="https://cdn.pixabay.com/photo/2019/11/02/07/15/medical-4595820_960_720.png" width="30" alt="clientes"/>
								<i className="fs-4 bi-bootstrap"></i>
								 <span className="ms-1 d-none d-sm-inline">Tratamiento</span></a>
							<ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
								<li className="w-100">
									<a href="/pages/Tratamientos/ListaTratamientos" className="nav-link px-0">
										 <span className="d-none d-sm-inline">Lista de tratamientos</span></a>
								</li>
								<li>
									<a href="/pages/Tratamientos/Tratamientos" className="nav-link px-0"> 
									<span className="d-none d-sm-inline">Añadir tratamiento</span></a>
								</li>
							</ul>
						</li> 
					</ul>
           
        </div>
    </div>
</div>
 )}
    
export default Navbar