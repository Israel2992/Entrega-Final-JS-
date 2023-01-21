
const servicios = (array) => {
    const contenedor = document.querySelector(".main-productos")
    const serviciosReduce = array.reduce((acc, element) => {
        return acc + `
            <div class="servicios">
                <div class="servicios-img">
                    <img clss ="imagen" src=${element.img} alt=${element.nombre}>
                </div>
                <h1>
                    ${element.nombre}
                </h1>
            </div>
        `
    }, "")
    
    contenedor.innerHTML = serviciosReduce
}
servicios(listaServicios)




const formLogin = document.querySelector("#login")
const inputUser = document.querySelector("#input-user")
const inputPassword = document.querySelector("#input-password")
const loginFailed =document.querySelector("#error-login")
const formContainer = document.querySelector(".header-login")
const salir = document.querySelector("#logout")
const modoOscuro = document.querySelector("#modo-oscuro")
const modoClaro =document.querySelector("#modo-claro")
const headerContainer = document.querySelector("#header")
const mainContainer = document.querySelector("#main")
const footerContainer = document.querySelector("#footer")
const headerTitulo = document.querySelector(".header-titulo")
const headerSaludo = document.querySelector(".header-saludo")




const subirInfoLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}


const obtenerInfoLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
} 



formLogin.onsubmit = (event) => {
    event.preventDefault()
    for(let i=0; i<usuarios.length; i++){
        if ( inputUser.value === usuarios[i].user && inputPassword.value === usuarios[i].password ){
            subirInfoLocalStorage("login", true)
            formLogin.style.display = "none"
            salir.style.display = "block"
            headerTitulo.style.display = "none"
            headerSaludo.style.display = "flex"
            swal(`Bienvenido ${usuarios[i].name}`)           
        }else {
            loginFailed.style.display = "block"
            inputUser.style.border = "1px solid red"
            inputPassword.style.border = "1px solid red"
        }
    }
}



const validarLogin = (key) => {
    if (key === true){
        formLogin.style.display = "none"
        salir.style.display = "flex"
        headerTitulo.style.display = "none"
        headerSaludo.style.display = "flex"
    }else{
        formLogin.style.display = "flex"
        salir.style.display = "none"
        headerTitulo.style.display = "flex"
        headerSaludo.style.display = "none"
    }
 }


 validarLogin(obtenerInfoLocalStorage("login"))


salir.onclick = () => {
    localStorage.removeItem("login")
    validarLogin(obtenerInfoLocalStorage("login"))
    formLogin.reset()
}




modoOscuro.onclick = ()  => {
    subirInfoLocalStorage("Modo Oscuro", true)
    headerContainer.style.background ="linear-gradient(to top,black,#404040)" 
    mainContainer.style.background = "black"
    mainContainer.style.color = "white"
    footerContainer.style.background = "linear-gradient(black,#404040)"
    headerTitulo.style.color = "white"
    modoOscuro.style.display = "none"
    modoClaro.style.display = "flex"
}

modoClaro.onclick = () => {
    headerContainer.style.background ="linear-gradient(to top,#020F59,#3C92A6)" 
    mainContainer.style.background = "linear-gradient(#020F59,#3C92A6)"
    mainContainer.style.color = "black"
    footerContainer.style.background = "linear-gradient(#3C92A6,white)"
    headerTitulo.style.color = "black"
    modoOscuro.textContent = "Modo Oscuro"
    modoOscuro.style.display = "flex"
    modoClaro.style.display = "none"
}



// CARRUSEL 

var swiper = new Swiper(".mySwiper", {
    cssMode: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
  });