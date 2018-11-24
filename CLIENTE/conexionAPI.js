const fetch = require("node-fetch")

const urlAPI = 'http://localhost:3000';


//Funcion que pide todos los productos a la API y los devuelve en un array de JSON
function getProductos(callback){
    fetch(urlAPI + '/productos').then(function(response){
        response.json().then(function(data){
            //console.log(data);
            return callback(data);
        })
    })
}

export {getProductos}


//Funcion que llama a la API que devuelve un producto en concreto dada su ID
function getProductoId(id,callback){
    fetch(urlAPI + '/productos/'+ id).then(function(response){
        response.json().then(function(data){
            //console.log(data);
            return callback(data);
        })
    })
}

export {getProductoId}

//Funcion que llama a la API que borra un producto dada su ID
function deleteProducto(id, token, callback){
    var us = {id: id}
    fetch(urlAPI + '/productos', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
          },
        method: 'DELETE',
        body: JSON.stringify(us)
    }).then(function(response){
        if(response.status > 199 && response.status < 299){
            callback('ok')
        }
        callback('no ok')
    })
}

export {deleteProducto}


//Funcion que llama a la API que dados unos datos de producto inserta un producto
//con estos datos
function addProducto(prod,callback){
    fetch(urlAPI + '/productos', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify(prod)
    }).then(function(response){
        if(response.status > 199 && response.status < 299){
            callback('ok')
        }
        callback('no ok')
    })
}

export {addProducto}

//Funcion que llama a la API que dados unos datos de producto actualiza un producto
//con estos datos
function updateProducto(prod,callback){
    fetch(urlAPI + '/productos', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'PUT',
        body: JSON.stringify(prod)
    }).then(function(response){
        if(response.status > 199 && response.status < 299){
            callback('ok')
        }
        callback('no ok')
    })
}

export {updateProducto}

//Funcion que llama a la API que dada la ID de una categoria devuelve todos los productos que
//se encuentran en dicha categoria
function getProductosCategoria(idcategoria, callback){
    fetch(urlAPI + '/categorias/'+idcategoria+'/productos',
    ).then(function(response){
        response.json().then(function(data){
            //console.log(data);
            return callback(data);
        })
    })
}

export {getProductosCategoria}

//Funcion que pide todas las categorias a la API y las devuelve en un array de JSON
function getCategorias(callback){
    fetch(urlAPI + '/categorias').then(function(response){
        response.json().then(function(data){
            //console.log(data);
            return callback(data);
        })
    })
}

export {getCategorias}

//Funcion que hace login en la API. Si es correcto, devuelve un token, y si no lo es devuelve
//un mensaje de error
function login(usuario, pass, callback){
    var us = {nick: usuario, password: pass};
    //console.log(us.nick+ " "+ us.password)
    fetch(urlAPI + '/login', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify(us)
    }).then(function(response){
        if(response.status == 400 || response.status == 401){
            console.log(response)
            return callback({err: 'No login',text: 'Error, revisa los datos y vuelvelo a intentar'});
        }
        else{
            response.text().then(function(data){
                return callback(data);
            })
        }
    })
}

export {login}