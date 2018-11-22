// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"pintarHTML.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pintarLogin = pintarLogin;
exports.pintarPlantilla = pintarPlantilla;

var fs = require("fs");

function pintarLogin() {
  var text = "<div class=\"container\">\n        <div class=\"card card-login mx-auto mt-5\">\n          <div class=\"card-header\">Login</div>\n          <div id=\"loginDiv\" class=\"card-body\">\n            <form>\n              <div class=\"form-group\">\n                <div class=\"form-label-group\">\n                  <input type=\"text\" id=\"inputUsuario\" class=\"form-control\" placeholder=\"Usuario\" required=\"required\" autofocus=\"autofocus\">\n                  <label for=\"inputUsuario\">Usuario</label>\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <div class=\"form-label-group\">\n                  <input type=\"password\" id=\"inputPassword\" class=\"form-control\" placeholder=\"Password\" required=\"required\">\n                  <label for=\"inputPassword\">Password</label>\n                </div>\n              </div>\n              <a id=\"botonLogin\" class=\"btn btn-primary btn-block\" href=\"#\">Login</a>\n            </form>\n          </div>\n        </div>\n      </div>";
  return text;
}

function pintarPlantilla() {
  var text = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n    <a class=\"navbar-brand\" href=\"#\">Bienvenido</a>\n    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n      <span class=\"navbar-toggler-icon\"></span>\n    </button>\n\n    <div class=\"navbar-collapse collapse w-100 order-3 dual-collapse2\">\n            <ul class=\"navbar-nav ml-auto\">\n                    <li class=\"nav-item dropdown\" style=\"margin-left: auto\">\n                        <a id=\"nomUsuario\" class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                        Esto es una prueba\n                        </a>\n                        <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\n                            <a id=\"linkLogout\" class=\"dropdown-item\" href=\"#\">Logout</a>\n                        </div>\n                    </li>\n            </ul>\n        </div>\n</nav>\n\n<!-- Sidebar -->\n<div id=\"wrapper\">\n    <ul class=\"sidebar navbar-nav\">\n            <li class=\"nav-item active\">\n            <a class=\"nav-link\" href=\"#\">\n                <i class=\"fas fa-fw\"></i>\n                <span>Categorias</span>\n            </a>\n            </li>\n            <div id=\"divCategorias\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"#\">\n                        <i class=\"fas fa-fw\"></i>\n                        <span>Ratones</span></a>\n                </li>\n            </div>\n\n    </ul>\n\n    <!-- Productos -->\n    <div id=\"content-wrapper\">\n        <div class=\"container-fluid\">\n            <div class=\"table-responsive\">\n                <table class=\"table table-bordered\" style=\"color:#F7F9FA\">\n                    <thead>\n                        <tr>\n                            <th>ID</th>\n                            <th>Nombre</th>\n                            <th>Acciones</th>\n                        </tr>\n                    </thead>\n                    <tbody id=\"tablaProductos\">\n                        <tr>\n                            <td>999</td>\n                            <td>Ejemplo</td>\n                            <td><a href=\"#\">Una cosa</a><a href=\"#\">Otra cosa</a></td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>";
  return text;
}
},{"fs":"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/_empty.js"}],"node_modules/node-fetch/browser.js":[function(require,module,exports) {

"use strict"; // ref: https://github.com/tc39/proposal-global

var getGlobal = function () {
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  throw new Error('unable to locate global object');
};

var global = getGlobal();
module.exports = exports = global.fetch; // Needed for TypeScript and Webpack.

exports.default = global.fetch.bind(global);
exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;
},{}],"conexionAPI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductos = getProductos;
exports.getProductosCategoria = getProductosCategoria;
exports.getCategorias = getCategorias;
exports.login = login;

var fetch = require("node-fetch");

var urlAPI = 'http://localhost:3000';

function getProductos(callback) {
  fetch(urlAPI + '/productos').then(function (response) {
    response.json().then(function (data) {
      //console.log(data);
      return callback(data);
    });
  });
}

function getProductosCategoria(idcategoria, callback) {
  fetch(urlAPI + '/categorias/' + idcategoria + '/productos').then(function (response) {
    response.json().then(function (data) {
      //console.log(data);
      return callback(data);
    });
  });
}

function getCategorias(callback) {
  fetch(urlAPI + '/categorias').then(function (response) {
    response.json().then(function (data) {
      //console.log(data);
      return callback(data);
    });
  });
}

function login(usuario, pass, callback) {
  var us = {
    nick: usuario,
    password: pass
  }; //console.log(us.nick+ " "+ us.password)

  fetch(urlAPI + '/login', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(us)
  }).then(function (response) {
    if (response.status == 400 || response.status == 401) {
      console.log(response);
      return callback({
        err: 'No login',
        text: 'Error, revisa los datos y vuelvelo a intentar'
      });
    } else {
      response.text().then(function (data) {
        return callback(data);
      });
    }
  });
}
},{"node-fetch":"node_modules/node-fetch/browser.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _pintarHTML = require("./pintarHTML.js");

var _conexionAPI = require("./conexionAPI.js");

function decodeUsuario(token) {
  var coded = token.split('.')[1];
  var decoded = atob(coded);
  var json = JSON.parse(decoded);
  return json;
}

function pintarProductos(datos) {
  var htmlString = "";
  var i;

  for (i = 0; i < datos.length; i++) {
    var producto = datos[i];
    var t = '<tr><th>' + producto.id + '</th><th>' + producto.nombre + '</th><th><button type="button" style="margin-right: 15px" class="btn btn-light id="ver' + producto.id + '">Ver</button><button type="button" class="btn btn-danger id="borrar' + producto.id + '">Borrar</button></th></tr>';
    htmlString += t;
  }

  tablaProductos.innerHTML = htmlString;
}

function categoriaPintando(cat) {
  (0, _conexionAPI.getProductosCategoria)(cat.id, function (datos) {
    pintarProductos(datos);
  });
}

function plantillaPintando() {
  document.getElementById('principal').innerHTML = (0, _pintarHTML.pintarPlantilla)();
  document.getElementById('nomUsuario').innerHTML = localStorage.getItem('user');
  document.getElementById('linkLogout').addEventListener('click', function () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    loginPintando();
  }); //Aquí meto los productos

  var tablaProductos = document.getElementById('tablaProductos');
  (0, _conexionAPI.getProductos)(function (datos) {
    pintarProductos(datos);
  }); //Aquí meto las categorias

  var divCategorias = document.getElementById('divCategorias');
  (0, _conexionAPI.getCategorias)(function (datos) {
    var htmlString = "";
    var i;

    for (i = 0; i < datos.length; i++) {
      var categoria = datos[i];
      var t = '<li class="nav-item"><a id="categoria' + i + '"class="nav-link" href="#"><i class="fas fa-fw"></i><span>' + categoria.nombre + '</span></a></li>';
      htmlString += t;
    }

    divCategorias.innerHTML = htmlString;
    var j;

    for (j = 0; j < datos.length; j++) {
      (function () {
        var ca = datos[j];
        var boton = document.getElementById('categoria' + j);
        boton.addEventListener('click', function () {
          categoriaPintando(ca);
        });
      })();
    }
  });
}

function loginPintando() {
  document.getElementById('principal').innerHTML = (0, _pintarHTML.pintarLogin)();
  document.getElementById('botonLogin').addEventListener('click', function () {
    var usu = document.getElementById('inputUsuario').value;
    var pass = document.getElementById('inputPassword').value;
    var text = (0, _conexionAPI.login)(usu, pass, function (datos) {
      if (datos.err) {
        document.getElementById('loginDiv').insertAdjacentHTML('afterend', '<div class="alert alert-danger alert-dismissible fade show" role="alert">' + datos.text + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
      } else {
        //console.log(datos);
        localStorage.setItem('token', datos);
        localStorage.setItem('user', decodeUsuario(datos).login); //guardarlo en localstorage y acceder

        plantillaPintando();
      }
    });
  });
}

loginPintando();
},{"./pintarHTML.js":"pintarHTML.js","./conexionAPI.js":"conexionAPI.js"}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42071" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.map