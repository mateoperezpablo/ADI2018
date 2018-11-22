const fetch = require("node-fetch")

const urlAPI = 'http://localhost:3000';

function getProductos(callback){
    fetch(urlAPI + '/productos').then(function(response){
        response.json().then(function(data){
            //console.log(data);
            return callback(data);
        })
    })
}

export {getProductos}

function getProductoId(id,callback){
    fetch(urlAPI + '/productos/'+ id).then(function(response){
        response.json().then(function(data){
            //console.log(data);
            return callback(data);
        })
    })
}

export {getProductoId}

function deleteProducto(id,callback){
    var us = {id: id}
    fetch(urlAPI + '/productos', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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

function getCategorias(callback){
    fetch(urlAPI + '/categorias').then(function(response){
        response.json().then(function(data){
            //console.log(data);
            return callback(data);
        })
    })
}

export {getCategorias}

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