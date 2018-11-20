function pintarLogin(){
    return '<div class="flex-container-center">' +
                '<div class="flex-container-column">' +
                    //'<div class="flex-container-row>' +
                        'Login: ' +
                        '<input id="inputLogin" type="text">' +
                    //'</div>' +
                    //'<div class="flex-container-row>' +
                        'Password: ' +
                        '<input id="inputPassword" type="password">' +
                    //'</div>' +
                    '<button id="botonLogin" type="button" value="Login">' +
                '</div>' +
            '</div>'
}

export {pintarLogin};