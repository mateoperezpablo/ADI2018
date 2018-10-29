var express = require('express')
var app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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

app.post("/productos", function(pet, resp){
    var prod = pet.body;
    anyadirProducto(prod, function(datos){
        var da = {id: datos[0]}
        resp.send(da)
        console.log(da)
    })

})

app.put("/productos", function(pet, resp){
    var prod = pet.body;
    actualizarProducto(prod, function(datos){
        var da = {id: datos[0]}
        resp.send(da)
        console.log(da)
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

app.get("/packs/:id", function(pet, resp){
    getPack(parseInt(pet.params.id), function(datos){
        resp.send(datos[0])
        console.log(datos[0])
    })

})

app.get("/packs/:id/productos", function(pet, resp){
    getProductosPack(parseInt(pet.params.id), function(datos){
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

function getPack(idpack, callback) {
    knex.select().from('packs').where({id: idpack})
    .then(function(datos){
      callback(datos)
    })
}

function getProductosPack(idpack, callback) {
    knex.select().from('productos').whereIn('id', function(){
        this.select('productos_id').from('prodtopacks').where({packs_id: idpack});
    })
    .then(function(datos){
      callback(datos)
    })
}

function anyadirProducto(prod, callback) {
    knex('productos').insert({nombre: prod.nombre, descripcion: prod.descripcion, precio: prod.precio, categoria_id: prod.categoria})
    .then(function(datos){
      callback(datos)
    })
}

function actualizarProducto(prod, callback) {
    knex('productos').where({id: prod.id}).update({nombre: prod.nombre, descripcion: prod.descripcion, precio: prod.precio, categoria_id: prod.categoria})
    .then(function(datos){
      callback(datos)
    })
}



// INICIAR SERVIDOR

app.listen(3000, function(){
    console.log("Servidor en marcha!!")
})