
// funcion para iniciar sesioon con Google

let provider = new firebase.auth.GoogleAuthProvider();
$('#loginGoogle').click(function() {
  firebase.auth()
    .signInWithPopup(provider)
    .then(function(result) {
      console.log(result.user);
      $('#loginGoogle').hide();
    });
});
//  variables de jQuery
let $email = $('#email');
let $password = $('#password');
let $register = $('#register');
let $logout = $('#logout');
let $login = $('#login');

// funcion para el registo de usuarios nuevos
$register.on('click', function() {
  const correo = $email.val();
  const password = $password.val();
  const registro = firebase.auth().createUserWithEmailAndPassword(correo, password)
    .catch(function(error) {
      // Mensaje en consola si existe error de registro
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
});


// funcion para iniciar sesion con correo y contrasena ya registrados
$login.on('click', function() {
  const email = $email.val();
  const password = $password.val();
  const inicio = firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Mensaje en consola si existe error de inicio de sesion
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
});

