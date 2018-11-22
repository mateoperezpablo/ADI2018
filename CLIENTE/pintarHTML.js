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