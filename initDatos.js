var knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./database.db"
    },
    useNullAsDefault: true
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

knex('pedidos').insert({usuario_id: 1}).then();
knex('pedidos').insert({usuario_id: 1}).then();
knex('pedidos').insert({usuario_id: 1}).then();
knex('pedidos').insert({usuario_id: 2}).then();


