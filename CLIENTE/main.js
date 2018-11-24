import {pintarLogin, pintarModificarProducto, pintarPlantilla, pintarVerProducto, pintarCrearProducto, pintarlistaProductos} from './pintarHTML.js'
import {getProductos, addProducto, updateProducto, getProductoId, getProductosCategoria, deleteProducto, getCategorias, login} from './conexionAPI.js'
import { resolveTxt } from 'dns';

//Funcion que dado un token devuelve el payload decodificado
function decodeUsuario(token){
    var coded = token.split('.')[1]
    var decoded = atob(coded);
    var json = JSON.parse(decoded);
    return json;
}

//Funcion que dado un producto muestra todos sus datos en una página
function verProducto(prod){
    getProductoId(prod.id, function(datos){
        //console.log(datos);
        document.getElementById('principalVista').innerHTML = pintarVerProducto();
        document.getElementById('tdId').innerHTML = datos.id;
        document.getElementById('tdPrecio').innerHTML = datos.precio;
        document.getElementById('tdDescripcion').innerHTML = datos.descripcion;
        document.getElementById('botonVolver').addEventListener('click', ()=>{
            getProductos(function(datos){
                document.getElementById('principal').innerHTML = pintarPlantilla();
                plantillaPintando();
                pintarProductos(datos);
            })
        })
    })
}

//Funcion que se usa cuando se pulsa el botón de borrar producto.
//Se borra un producto dada su ID y se vuelve a pintar la interfaz según
//si la operación tiene éxito o no
function borrarProducto(prod){
    deleteProducto(prod.id, localStorage.getItem('token'), function(datos){
        //console.log(datos);
        document.getElementById('principal').innerHTML = pintarPlantilla();
        plantillaPintando();
        console.log(datos);
        if(datos=='ok'){
            console.log('JAJ')
        }
        getProductos(function(data){
            document.getElementById('principal').innerHTML = pintarPlantilla();
            plantillaPintando();
            pintarProductos(data);
            document.getElementById('principalVista').insertAdjacentHTML('afterbegin', '<div class="alert alert-info alert-dismissible fade show" role="alert">Producto borrado con éxito</div>');

        })
    })
}


//Funcion que se usa cuando se pincha el botón de modificar un producto.
//Se va a un formulario con los datos del producto actuales, los cuales
//se pueden modificar y se pinta la interfaz según si la operación tiene
//éxito o no
function modificarProducto(prod){
    document.getElementById('principalVista').innerHTML = pintarModificarProducto();
    document.getElementById('inputId').value = prod.id;
    document.getElementById('inputNombre').value = prod.nombre;
    document.getElementById('inputPrecio').value = prod.precio;
    document.getElementById('inputDescripcion').value = prod.descripcion;
    console.log(prod);
    getCategorias(function(datos){
        var sel = document.getElementById('inputCategoria');
            var html = '';
            for(var i=0;i<datos.length;i++){
                var cat = datos[i];
                var tx = '<option value='+cat.id+'>'+cat.nombre+'</option>';
                html += tx;
            }
            sel.innerHTML = html;

            var options = document.getElementById('inputCategoria').options;
            var indx;
            for(var i = 0;i<options.length;i++){
                console.log(options[i].value + ' ' + prod.categoria_i)
                if(options[i].value == prod.categoria_id) indx = i;
            }
            console.log('soy la categoria ' + indx)
            if(indx) document.getElementById('inputCategoria').selectedIndex = indx;

            var botonMoficiar = document.getElementById('botonCrearProducto');
            botonMoficiar.innerHTML = 'Modificar';
            botonMoficiar.addEventListener('click', ()=>{
                var nNombre = document.getElementById('inputNombre').value;
                var nPrecio = document.getElementById('inputPrecio').value;
                var nDescripcion = document.getElementById('inputDescripcion').value;
                var nCategoria = document.getElementById('inputCategoria').value;
                var nProducto = {id: prod.id, nombre: nNombre, precio: nPrecio, descripcion: nDescripcion, categoria: nCategoria}

                updateProducto(nProducto, function(datos){
                    if(datos=='ok'){
                        document.getElementById('principal').innerHTML = pintarPlantilla;
                        plantillaPintando();
                        document.getElementById('principalVista').insertAdjacentHTML('afterbegin', '<div id="checkEsto" class="alert alert-info alert-dismissible fade show" role="alert">Producto modificado con éxito</div>');
                    }
                    if(datos=='no ok'){
                        var ch = document.getElementById('checkEsto')
                        if(!ch) document.getElementById('principalVista').insertAdjacentHTML('afterbegin', '<div id="checkEsto" class="alert alert-danger alert-dismissible fade show" role="alert">Error, vuelvelo a intentar</div>');
                    }
                })
            })

    })
}

//Funcion que pinta todos los productos dados en 'datos'
function pintarProductos(datos){
    var htmlString = "";
        var i;
        for(i=0;i<datos.length;i++){
            var producto = datos[i];
            var t = '<tr><th>'+producto.id+'</th><th>'+producto.nombre+'</th><th><button type="button" id="ver'+i+'" style="margin-right: 15px" class="btn btn-light">Ver</button><button type="button" id="modificar'+i+'" style="margin-right: 15px" class="btn btn-primary">Modificar</button><button type="button" id="borrar'+i+'" class="btn btn-danger">Borrar</button></th></tr>';
            htmlString+=t;
        }
        tablaProductos.innerHTML = htmlString;
        for(i=0;i<datos.length;i++){
            (function(){
                var prod = datos[i];
                var botonVer = document.getElementById('ver'+i);
                var botonBorrar = document.getElementById('borrar'+i);
                var botonModificar = document.getElementById('modificar'+i);
                botonVer.addEventListener('click', function(){
                    verProducto(prod);
                });
                botonBorrar.addEventListener('click', function(){
                    borrarProducto(prod);
                })
                botonModificar.addEventListener('click', function(){
                    modificarProducto(prod);
                })
            }())
        }
}

//Funcion que consigue todos los productos de una categoria y los pinta (utilizando la funcion anterior)
function categoriaPintando(cat){
    document.getElementById('principalVista').innerHTML = pintarlistaProductos();
    getProductosCategoria(cat.id, function(datos){
        pintarProductos(datos);
    })
}

//Funcion que pinta toda la plantilla
function plantillaPintando(){
    document.getElementById('principal').innerHTML = pintarPlantilla();
    document.getElementById('nomUsuario').innerHTML = localStorage.getItem('user');
    document.getElementById('botonHome').addEventListener('click', ()=> {
        getProductos(function(datos){
            document.getElementById('principal').innerHTML = pintarPlantilla();
            plantillaPintando();
            pintarProductos(datos);
        })
    });
    document.getElementById('linkLogout').addEventListener('click', ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        loginPintando();
    });
    document.getElementById('linkCrearProducto').addEventListener('click', ()=>{
        document.getElementById('principal').innerHTML = pintarPlantilla();
        plantillaPintando();
        document.getElementById('principalVista').innerHTML = pintarCrearProducto();
        getCategorias(function(datos){

            var sel = document.getElementById('inputCategoria');
            var html = '';
            for(var i=0;i<datos.length;i++){
                var cat = datos[i];
                var tx = '<option value='+cat.id+'>'+cat.nombre+'</option>';
                html += tx;
            }
            sel.innerHTML = html;

            document.getElementById('botonCrearProducto').addEventListener('click', ()=>{
                var nombre = document.getElementById('inputNombre').value;
                var precio = document.getElementById('inputPrecio').value;
                var descripcion = document.getElementById('inputDescripcion').value;
                var categoria = document.getElementById('inputCategoria').value;
                var prod = {nombre: nombre, precio: precio, descripcion: descripcion, categoria: categoria};
                addProducto(prod, function (datos){
                    console.log(datos);
                    if(datos=='ok'){
                        document.getElementById('principal').innerHTML = pintarPlantilla;
                        plantillaPintando();
                        document.getElementById('principalVista').insertAdjacentHTML('afterbegin', '<div id="checkEsto" class="alert alert-info alert-dismissible fade show" role="alert">Producto creado con éxito</div>');
                    }
                    if(datos=='no ok'){
                        var ch = document.getElementById('checkEsto')
                        if(!ch) document.getElementById('principalVista').insertAdjacentHTML('afterbegin', '<div id="checkEsto" class="alert alert-danger alert-dismissible fade show" role="alert">Error, vuelve a crear el producto</div>');
                    }
                    
                })
            })
        })
    })

    //Aquí meto los productos
    var tablaProductos = document.getElementById('tablaProductos');
    getProductos(function(datos){
        pintarProductos(datos);
    })

    //Aquí meto las categorias
    var divCategorias = document.getElementById('divCategorias');
    getCategorias(function(datos){
        var htmlString = "";
        var i;
        for(i=0;i<datos.length;i++){
            var categoria = datos[i];
            var t = '<li class="nav-item"><a id="categoria'+i+'"class="nav-link" href="#"><i class="fas fa-fw"></i><span>'+ categoria.nombre +'</span></a></li>'
            htmlString+=t;
        }
        divCategorias.innerHTML = htmlString;
        var j
        for(j=0;j<datos.length;j++){
            (function(){
                var ca = datos[j];
                var boton = document.getElementById('categoria'+j);
                boton.addEventListener('click', function(){
                    categoriaPintando(ca)
                }); 
            }())
            
        }
    });
}

//Funcion que pinta el login inicial
function loginPintando(){
    document.getElementById('principal').innerHTML = pintarLogin();

    document.getElementById('botonLogin').addEventListener('click', ()=>{
    var usu = document.getElementById('inputUsuario').value;
    var pass = document.getElementById('inputPassword').value;
    var text = login(usu, pass, function(datos){
        if(datos.err){
            document.getElementById('loginDiv').insertAdjacentHTML('afterend', '<div class="alert alert-danger alert-dismissible fade show" role="alert">' + datos.text + '</div>')
        }
        else{
            //console.log(datos);
            localStorage.setItem('token', datos);
            localStorage.setItem('user', decodeUsuario(datos).login);
            //guardarlo en localstorage y acceder
            plantillaPintando();
            }
        });
    });
}

//Llamada inicial para que se pinte el login al principio
loginPintando();