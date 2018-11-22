import {pintarLogin, pintarPlantilla} from './pintarHTML.js'
import {getProductos, getProductosCategoria, getCategorias, login} from './conexionAPI.js'

function decodeUsuario(token){
    var coded = token.split('.')[1]
    var decoded = atob(coded);
    var json = JSON.parse(decoded);
    return json;
}

function pintarProductos(datos){
    var htmlString = "";
        var i;
        for(i=0;i<datos.length;i++){
            var producto = datos[i];
            var t = '<tr><th>'+producto.id+'</th><th>'+producto.nombre+'</th><th><button type="button" style="margin-right: 15px" class="btn btn-light id="ver'+producto.id+'">Ver</button><button type="button" class="btn btn-danger id="borrar'+producto.id+'">Borrar</button></th></tr>';
            htmlString+=t;
        }
        tablaProductos.innerHTML = htmlString;
}

function categoriaPintando(cat){
    getProductosCategoria(cat.id, function(datos){
        pintarProductos(datos);
    })
}

function plantillaPintando(){
    document.getElementById('principal').innerHTML = pintarPlantilla();
    document.getElementById('nomUsuario').innerHTML = localStorage.getItem('user');
    document.getElementById('linkLogout').addEventListener('click', ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        loginPintando();
    });

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