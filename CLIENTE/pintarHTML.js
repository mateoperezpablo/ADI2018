var fs = require("fs");

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