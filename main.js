var express = require('express')
var app = express()

var knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./database.db"
    },
    useNullAsDefault: true
});


//CAPA WEB
app.get("/categorias", function(pet, resp){
    listarCategorias(function(datos){
        resp.send(datos)
        console.log(datos)
    })

})

app.get("/productos", function(pet, resp){
    listarProductos(function(datos){
        resp.send(datos)
        console.log(datos)
    })

})

app.get("/pedidos", function(pet, resp){
    listarPedidos(function(datos){
        resp.send(datos)
        console.log(datos)
    })

})

app.get("/linpedidos", function(pet, resp){
    listarLinpedidos(function(datos){
        resp.send(datos)
        console.log(datos)
    })

})

app.get("/packs", function(pet, resp){
    listarPacks(function(datos){
        resp.send(datos)
        console.log(datos)
    })

})


//CAPA DE ACCESO A DATOS
function listarProductos(callback) {
    knex.select().from('productos')
    .then(function(datos){
      callback(datos)
    })
}

function listarCategorias(callback) {
    knex.select().from('categorias')
    .then(function(datos){
      callback(datos)
    })
}

function listarPedidos(callback) {
    knex.select().from('pedidos')
    .then(function(datos){
      callback(datos)
    })
}

function listarLinpedidos(callback) {
    knex.select().from('linpedidos')
    .then(function(datos){
      callback(datos)
    })
}

function listarPacks(callback) {
    knex.select().from('packs')
    .then(function(datos){
      callback(datos)
    })
}



// INICIAR SERVIDOR

app.listen(3000, function(){
    console.log("Servidor en marcha!!")
})