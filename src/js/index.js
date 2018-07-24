// funcion para iniciar sesioon con Google
let providerg = new firebase.auth.GoogleAuthProvider();
$('#loginGoogle').click(function() {
  firebase.auth()
    .signInWithPopup(providerg)
    .then(function(result) {
      console.log(result.user);
      $('#loginGoogle').hide();
    });
});

// funcion para iniciar sesion con facebook
let providerf = new firebase.auth.FacebookAuthProvider();
$('#loginFacebook').click(function() {
  firebase.auth()
    .signInWithPopup(providerf)
    .then(function(result) {
      console.log(result.user);
      $('#loginFacebook').hide();
    });
});


//  variables de jQuery
let $email = $('#email');
let $password = $('#password');
let $register = $('#register');
// let $logout = $('#logout');
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
      alert('Usuario o contraseña incorrectos');
    });
});

// para configurar un observador de estado de autenticación y obtén datos del usuario
let observador = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('existe usuario activo');
      muro();
      // User is signed in.
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
      console.log(user);
    // ...
    } else {
      console.log('no existe usuario activo');
    // User is signed out.
    }
  });
};
observador();

let muro = () => {
  location.assign('views/view1.html');
};

let $logout = $('#logout');
$logout.on('click', function() {
  firebase.auth().signOut()
    .then(function functionName() {
      console.log(' saliendo. ..');
      location.assign('index.html');
    })
    .catch(function(error) {
      console.log(error);
    });
});

/* let cerrar = () => {
  firebase.auth().signOut()
    .then(function functionName() {
      console.log('saliendo...');
    })
    .catch(function(error) {
      console.log(error);
    });
};*/
