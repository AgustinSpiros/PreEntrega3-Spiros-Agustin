class Producto {
    constructor(id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre; 
        this.precio = precio;
        this.img = img; 
        this.cantidad = 1;
    }
}

const simple = new Producto(1, "Shyvak Simple", 1190, "images/1x/simple.png");
const doble = new Producto(2, "Shyvak Doble", 1340, "images/1x/doble.png");
const joker = new Producto(3, "Joker", 1340, "images/1x/joker.png");
const triple = new Producto(4, "Shyvak Triple", 1690, "images/1x/triple.png");
const crispy = new Producto(5, "Crispy", 1340, "images/1x/crispy.png");
const sweetonion = new Producto(6, "Sweet Onion" , 1340, "images/1x/onion.png", "doble medallon de carne, cheddar, bacon, cebolla caramelizada, barbacoa");
const smith = new Producto(7, "Smith", 1340, "images/1x/smith.png");
const smoked = new Producto(8, "Smoked Bacon", 1490, "images/1x/smoked.png");
const veggie = new Producto (9, "Burger Veggie", 1250, "images/1x/veggie.png");
const papas = new Producto (10, "Papas Fritas", 850, "images/papasfritas.png" );
const papascyb = new Producto (11, "Papas Fritas con cheddar y bacon", 890, "images/papasfcyb.png");
const nuggets = new Producto (12, "nuggets de pollo", 850, "images/nugg.png");
const arosdecebolla = new Producto (13, "aros de cebolla", 790, "images/arosdecebo.png");
const coca = new Producto (14, "lata coca", 350, "images/bebidas/latacoca.png");
const cocazero = new Producto (15, "lata coca zero", 350, "images/bebidas/cocazero.png");
const sprite = new Producto (16, "lata sprite", 350, "images/bebidas/sprite.png");
const patagonia1 = new Producto (17, "lata ipa", 500, "images/bebidas/ipa.png");
const patagonia2 = new Producto (18, "lata amber laguer", 500, "images/bebidas/amber.png");
const patagonia3 = new Producto (19, "lata weise", 500, "images/bebidas/weise.png");
const patagonia4 = new Producto (20, "lata bohemian", 500, "images/bebidas/bohemian.png");


const productos = [simple, doble, joker, triple, crispy, sweetonion, smith, smoked, veggie, papas, papascyb, nuggets, arosdecebolla, coca, cocazero, sprite, patagonia1, patagonia2, patagonia3, patagonia4 ];


console.log(productos);


let carrito = [];


if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}


const contenedorProductos = document.getElementById("contenedorProductos");


const mostrarProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-4", "col-md-6", "col-sm-10");
        card.innerHTML = `
                        <div class ="card">
                            <img src = "${producto.img}" class = "card-img-top imgProductos" alt = "${producto.nombre}">
                            <div>
                                <h5> ${producto.nombre} </h5>
                                <p> ${producto.precio} </p>
                                <button class = "btn colorBoton" id="boton${producto.id}" > Agregar al Carrito </button>
                            </div>
                        </div>
                        `
        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })
    })
}

mostrarProductos();


const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    calcularTotal();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}


const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class ="card">
                            <img src = "${producto.img}" class = "card-img-top imgProductos" alt = "${producto.nombre}">
                            <div>
                                <h5> ${producto.nombre} </h5>
                                <p> ${producto.precio} </p>
                                <p> ${producto.cantidad} </p>
                                <button class = "btn colorBoton" id="eliminar${producto.id}" > Eliminar </button>
                            </div>
                        </div>
                        `
        contenedorCarrito.appendChild(card);

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}


const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}


const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;

    })
    total.innerHTML = `Total: $${totalCompra}`;
}

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = []; 
    mostrarCarrito();

    localStorage.clear();
}