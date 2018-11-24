var fs = require("fs");

//Todas las funciones leen diferentes archivos html que sirven de plantilla,
//y devuelven estos archivos en un string para insertarlos 


function pintarLogin(){
    var text = fs.readFileSync('htmls/login.html', 'utf8');
    return text;
}

export {pintarLogin};

function pintarPlantilla(){
    var text = fs.readFileSync('htmls/plantilla.html', 'utf8');
    return text;
}

export {pintarPlantilla};

function pintarVerProducto(){
    var text = fs.readFileSync('htmls/producto.html', 'utf8');
    return text;
}

export {pintarVerProducto};

function pintarCrearProducto(){
    var text = fs.readFileSync('htmls/crearProducto.html', 'utf8');
    return text;
}

export {pintarCrearProducto};

function pintarModificarProducto(){
    var text = fs.readFileSync('htmls/modificarProducto.html', 'utf8');
    return text;
}

export {pintarModificarProducto};

function pintarlistaProductos(){
    var text = fs.readFileSync('htmls/listaProductos.html', 'utf8');
    return text;
}

export {pintarlistaProductos};