import 'bootstrap/dist/css/bootstrap.min.css';


function Home(){
        return(
          <div className="col py-3 mt-5">
            <h2 className="text-center mb-5 font-bold">Bienvenid@ a la clínica Goodhealth</h2>
          <div id="carouselExampleInterval" className="carousel slide ms-md-5" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="2500">
              <img src="https://cdn.pixabay.com/photo/2020/04/04/19/52/medicine-5003631_960_720.jpg" className="d-block w-50" alt="veterinario1"/>
            </div>
            <div className="carousel-item" data-bs-interval="2500">
              <img src="https://cdn.pixabay.com/photo/2013/02/25/04/37/veterinary-85925_960_720.jpg" className="d-block w-50" height="500" alt="veterinario2"/>
            </div>
            <div className="carousel-item" data-bs-interval="2500">
              <img src="https://cdn.pixabay.com/photo/2016/12/17/05/45/dog-1912874_960_720.jpg" className="d-block w-50" height="500" alt="veterinario3"/>
            </div>
          </div>
        </div>
        
        </div>

)
}


export default Home