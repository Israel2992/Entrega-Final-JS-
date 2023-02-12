const contenedorFavoritos = document.querySelector(".contenedor-favoritos")
const mensaje             = document.querySelector(".mensaje")

let informacionLocalStorage = JSON.parse(localStorage.getItem("favoritos"))
console.log(informacionLocalStorage)




const imagen = (array) => {
    const serviciosReduce = array.reduce((acc, element) => {
        return acc + `
            <div class="imagen" id="${element.numero}">
                <div class="imagen-img">
                    <img clss ="imagen" src=${element.img} alt=${element.numero} title=${element.numero}>
                </div>
                <button id="boton-${element.numero}" class="boton-img" > Eliminar de Favoritos </button>
            </div>
        `
    }, "")
    
    contenedorFavoritos.innerHTML = serviciosReduce
}
imagen(informacionLocalStorage || [] )




const borrarFavoritos = (array) =>{
    const botonAgregar = document.querySelectorAll(".boton-img")

    botonAgregar.forEach(boton => {
        boton.onclick = () =>{
            const numero = boton.id.slice(6)
            const filtrarImagen = array.filter((elemento) => {
                return elemento.numero != Number(numero)
            })
            informacionLocalStorage = filtrarImagen
            localStorage.setItem("favoritos",JSON.stringify(informacionLocalStorage))
            console.log(informacionLocalStorage)
            imagen(informacionLocalStorage)
            borrarFavoritos(informacionLocalStorage)
        }
    })
}
borrarFavoritos(informacionLocalStorage)



const borrarTodoFavoritos = document.querySelector(".borrar-favoritos")

borrarTodoFavoritos.onclick = () =>{
    localStorage.removeItem("favoritos")
    contenedorFavoritos.innerHTML = ""
    contenedorFavoritos.style.display = "none"
    mensaje.style.display = "flex"


}
