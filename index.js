
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




const formLogin             = document.querySelector( "#login")
const inputUser             = document.querySelector( "#input-user")
const inputPassword         = document.querySelector( "#input-password")
const loginFailed           = document.querySelector( "#error-login")
const formContainer         = document.querySelector( ".header-login")
const salir                 = document.querySelector( "#logout")
const modoOscuro            = document.querySelector( "#modo-oscuro")
const modoClaro             = document.querySelector( "#modo-claro")
const headerContainer       = document.querySelector( "#header")
const mainContainer         = document.querySelector( "#main")
const footerContainer       = document.querySelector( "#footer")
const headerTitulo          = document.querySelector( ".header-titulo")
const headerSaludo          = document.querySelector( ".header-saludo")
const formUsuarioNuevo      = document.querySelector( ".registro")
const inputNuevoNombre      = document.querySelector( "#new-name")
const inputNuevoUsuario     = document.querySelector( "#new-user")
const inputNuevoPassword    = document.querySelector("#new-password")
const barraNav              = document.querySelector( "#navbarNav")
const contenedor            = document.querySelector( ".main-productos")
const contenedorBody        = document.querySelector("body")



const subirInfoLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}


const obtenerInfoLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
} 

// VALIDACION DE USUARIOS YA INSCRITOS, hay una serie de ellos seteado en el archivo usuarios.js

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
        }else if (inputUser.value === usuarios[i].user && inputPassword.value !== usuarios[i].password){
            swal(`Contraseña Incorrecta`)
            loginFailed.style.display = "block"
            loginFailed.style.color = "red"
            inputUser.style.border = "1px solid red"
            inputPassword.style.border = "1px solid red"
        }
        else if (inputUser.value !== usuarios[i].user && inputPassword.value === usuarios[i].password){
            swal(`Usuario Incorrecto`)
            loginFailed.style.display = "block"
            loginFailed.style.color = "red"
            inputUser.style.border = "1px solid red"
            inputPassword.style.border = "1px solid red"
        }else {
            loginFailed.style.display = "block"
            loginFailed.style.color = "red"
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


//VALIDACION DE NUEVOS USUARIOS 
// USUARIO DEBE DE TENER UN @ 
// CONTRASEÑA DEBE DE SER ALFANUMERICO Y TENER MINIMO 8 DIGITOS 


formUsuarioNuevo.onsubmit = (event) =>{
    event.preventDefault()

        let detectarArroba = 0    
        let contadorPassword = 0 
        let detectorPassword = 0

        let name = inputNuevoNombre.value
        let user = inputNuevoUsuario.value
        let password = inputNuevoPassword.value

        for ( let i = 0; i < user.length; i++){             
            if ( user[i].match(/[@]/)) {
                detectarArroba = detectarArroba + 1}
        }
    

        for ( let i = 0; i < password.length; i++){        
            contadorPassword++
        }

        for ( let i = 0; i < password.length; i++){         
            if (password[i].match(/^[0-9]+$/)){
                detectorPassword++
            }
        }


        if (detectarArroba > 0 && contadorPassword >= 8 && detectorPassword >0){
            swal(`Inscripcion Exitosa`) 
        }
        else if (detectarArroba <= 0 && contadorPassword >= 8 && detectorPassword >0){
            swal(`Usuario inválido, debe de tener @, ingrese un nuevo email `) 
        }
        else if (detectarArroba > 0 && contadorPassword < 8 && detectorPassword >0){
            swal(`Contraseña inválida, tiene menos de 8 caracteres.`)
        }
        else if (detectarArroba > 0 && contadorPassword >= 8 && detectorPassword <= 0){
            swal(`Contraseña inválida, no tines caracteres numericos`)
        }
        else if (detectarArroba > 0 && contadorPassword < 8 && detectorPassword <=0){
            swal(`Contraseña inválida, no tines caracteres alfanumericos y tiene menos de 8 caracteres`)
        }
        else{
            swal(`Usuario Invalido`)
        }

        fetch("https://63d485980e7ae91a009e7517.mockapi.io/usuariosNuevos", {
            method: "POST",
            body: JSON.stringify({
                user:  `${user}`,
                password: `${password}`,
                name: `${name}`
            }),
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then( res => res.json())
        .then( data => console.log(data))


}




modoOscuro.onclick = ()  => {
    subirInfoLocalStorage("Modo Oscuro", true)
    contenedorBody.style.background = "radial-gradient(circle,#464444,black)"
    mainContainer.style.color = "white"
    headerTitulo.style.color = "white"
    modoOscuro.style.display = "none"
    modoClaro.style.display = "flex"
    barraNav.style.background = "#464444"
}

modoClaro.onclick = () => {
    contenedorBody.style.background = "radial-gradient(circle,#3C92A6,#020F59)"
    mainContainer.style.color = "black"
    headerTitulo.style.color = "black"
    barraNav.style.background = "#020F59"
    modoOscuro.textContent = "Modo Oscuro"
    modoOscuro.style.display = "flex"
    modoClaro.style.display = "none"
}


// para agregar a favoritos

const imagen = (array) => {
    const serviciosReduce = array.reduce((acc, element) => {
        return acc + `
            <div class="imagen" id="${element.numero}">
                <div class="imagen-img">
                    <img clss ="imagen" src=${element.img} alt=${element.numero} title=${element.numero}>
                </div>
                <button id="boton-${element.numero}" class="boton-img" > Agregar a Favoritos </button>
            </div>
        `
    }, "")
    
    contenedor.innerHTML = serviciosReduce
}
imagen(galeria)





const favoritos = []

// llamo los botones que van a generar la accion de añadir a favoritos 

const agregarFavoritos = (array) =>{
    const botonAgregar = document.querySelectorAll(".boton-img")

    botonAgregar.forEach(boton => {
        boton.onclick = () =>{
            const numero = boton.id.slice(6)
            const filtrarImagen = array.find((elemento) => {
                return elemento.numero === Number(numero)
            })
            favoritos.push(filtrarImagen)
            console.log(favoritos)
            localStorage.setItem("favoritos",JSON.stringify(favoritos))
        }
    })
}
agregarFavoritos(galeria)

const imagenesFavoritas = JSON.parse(localStorage.getItem("favoritos"))
favoritos = imagenesFavoritas || []




