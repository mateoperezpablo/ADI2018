var knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./database.db"
    },
    useNullAsDefault: true
});

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

  //TABLA PEDIDOS
  knex.schema.hasTable('pedidos').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('pedidos', function(table) {
        table.increments();
        table.integer('usuario_id').unsigned()
        table.foreign('usuario_id').references('usuario.id');
      });
    }
  });
