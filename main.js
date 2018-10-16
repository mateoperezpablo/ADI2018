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
    listarProductos(id, function(datos){
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


app.listen(3000, function(){
    console.log("Servidor en marcha!!")
    initDatabase();
})

function initDatabase(){

    //TABLA USUARIOS
    knex.schema.hasTable('usuarios').then(function(exists) {
        if (!exists) {
          return knex.schema.createTable('usuarios', function(table) {
            table.increments();
            table.string('nombre');
            table.string('apellidos');
            table.string('nick');
            table.string('password');
          });
        }
      });

      //TABLA CATEGORIAS
      knex.schema.hasTable('categorias').then(function(exists) {
        if (!exists) {
          return knex.schema.createTable('categorias', function(table) {
            table.increments();
            table.string('nombre');
            table.string('descripcion');
          });
        }
      });

      //TABLA PRODUCTOS
      knex.schema.hasTable('productos').then(function(exists) {
        if (!exists) {
          return knex.schema.createTable('productos', function(table) {
            table.increments();
            table.string('nombre');
            table.string('descripcion');
            table.float('precio');
            table.integer('categoria_id').unsigned()
            table.foreign('categoria_id').references('categorias.id');
          });
        }
      });


      knex.insert({nombre: "Pablo", apellidos: "Mateo Pérez", nick: "Noisy", password: "123456789"}).into('usuarios').then();
      knex.insert({nombre: "Prueba1", apellidos: "Prueba1", nick: "Prueba1", password: "Prueba1"}).into('usuarios').then();
      knex.insert({nombre: "Prueba2", apellidos: "Prueba2 Prueba2", nick: "Prueba2", password: "Prueba2"}).into('usuarios').then();

      knex('categorias').insert({nombre: "Ratones", descripcion: "descripcion sencilla"}).then();
      knex('categorias').insert({nombre: "Teclados", descripcion: "descripcion sencilla"}).then();
      knex('categorias').insert({nombre: "Pantallas", descripcion: "descripcion sencilla"}).then();

      knex('productos').insert({nombre: "Raton LG", descripcion: "descripcion", precio: 10.05, categoria_id: 1}).then();
      knex('productos').insert({nombre: "Raton Razer", descripcion: "descripcion", precio: 12.55, categoria_id: 1}).then();
      knex('productos').insert({nombre: "Teclado LG", descripcion: "descripcion", precio: 7.05, categoria_id: 1}).then();
      knex('productos').insert({nombre: "Pantalla TTL", descripcion: "descripcion", precio: 120.18, categoria_id: 1}).then();

}