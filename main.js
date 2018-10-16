var express = require('express');
var app = express();

app.get('*', function(pet,resp) {
   resp.status(200);
   resp.send('Hola soy Express'); 
});

app.listen(3000, function () {
   console.log("El servidor express está en el puerto 3000");
});