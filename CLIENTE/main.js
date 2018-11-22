import {pintarLogin, pintarPlantilla, pintarVerProducto, pintarCrearProducto} from './pintarHTML.js'
import {getProductos, addProducto, getProductoId, getProductosCategoria, deleteProducto, getCategorias, login} from './conexionAPI.js'

function decodeUsuario(token){
    var coded = token.split('.')[1]
    var decoded = atob(coded);
    var json = JSON.parse(decoded);
    return json;
}

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

function borrarProducto(prod){
    deleteProducto(prod.id, function(datos){
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
            document.getElementById('principalVista').insertAdjacentHTML('afterbegin', '<div class="alert alert-info alert-dismissible fade show" role="alert">Producto borrado con éxito<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');

        })
    })
}

function pintarProductos(datos){
    var htmlString = "";
        var i;
        for(i=0;i<datos.length;i++){
            var producto = datos[i];
            var t = '<tr><th>'+producto.id+'</th><th>'+producto.nombre+'</th><th><button type="button" id="ver'+i+'" style="margin-right: 15px" class="btn btn-light">Ver</button><button type="button" id="borrar'+i+'" class="btn btn-danger">Borrar</button></th></tr>';
            htmlString+=t;
        }
        tablaProductos.innerHTML = htmlString;
        for(i=0;i<datos.length;i++){
            (function(){
                var prod = datos[i];
                var botonVer = document.getElementById('ver'+i);
                var botonBorrar = document.getElementById('borrar'+i);
                botonVer.addEventListener('click', function(){
                    verProducto(prod);
                });
                botonBorrar.addEventListener('click', function(){
                    borrarProducto(prod);
                })
            }())
        }
}

function categoriaPintando(cat){
    getProductosCategoria(cat.id, function(datos){
        pintarProductos(datos);
    })
}

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
        document.getElementById('botonCrearProducto').addEventListener('click', ()=>{
            var nombre = document.getElementById('inputNombre').value;
            var precio = document.getElementById('inputPrecio').value;
            var descripcion = document.getElementById('inputDescripcion').value;
            var prod = {nombre: nombre, precio: precio, descripcion: descripcion, categoria: 1};
            addProducto(prod, function (datos){
                console.log(datos);
                if(datos=='ok'){
                    document.getElementById('principal').innerHTML = pintarPlantilla;
                    plantillaPintando();
                    document.getElementById('principalVista').insertAdjacentHTML('afterbegin', '<div id="checkEsto" class="alert alert-info alert-dismissible fade show" role="alert">Producto creado con éxito<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
                }
                if(datos=='no ok'){
                    var ch = document.getElementById('checkEsto')
                    if(!ch) document.getElementById('principalVista').insertAdjacentHTML('afterbegin', '<div class="alert alert-danger alert-dismissible fade show" role="alert">Error, vuelve a crear el producto<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
                }
                
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

function loginPintando(){
    document.getElementById('principal').innerHTML = pintarLogin();

    document.getElementById('botonLogin').addEventListener('click', ()=>{
    var usu = document.getElementById('inputUsuario').value;
    var pass = document.getElementById('inputPassword').value;
    var text = login(usu, pass, function(datos){
        if(datos.err){
            document.getElementById('loginDiv').insertAdjacentHTML('afterend', '<div class="alert alert-danger alert-dismissible fade show" role="alert">' + datos.text + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
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

loginPintando();