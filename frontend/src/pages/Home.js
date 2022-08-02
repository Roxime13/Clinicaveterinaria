import 'bootstrap/dist/css/bootstrap.min.css';


function Home(){
        return(
          <div className="row">
          <div className="col mt-5">
            <h2 className="text-center mb-5 font-bold">Bienvenid@ a la clínica Goodhealth</h2>
          <div  className="carousel slide ms-md-5" data-bs-ride="carousel">
          <div className="carousel-inner w-50 m-auto">
            <div className="carousel-item active" data-bs-interval="2000">
              <img src="https://cdn.pixabay.com/photo/2020/04/04/19/52/medicine-5003631_960_720.jpg" className="d-block" height="400" alt="veterinario1"/>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="https://cdn.pixabay.com/photo/2013/02/25/04/37/veterinary-85925_960_720.jpg" className="d-block" height="450" alt="veterinario2"/>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="https://cdn.pixabay.com/photo/2016/12/17/05/45/dog-1912874_960_720.jpg" className="d-block" height="470" alt="veterinario3"/>
            </div>
          </div>
        </div>
        </div>
        </div>

)
}


export default Home