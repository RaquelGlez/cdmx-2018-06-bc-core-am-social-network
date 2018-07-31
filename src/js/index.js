
//  variables de jQuery
let $name = $('#name');
let $apellido = $('#last_name');
let $emailRegistro = $('#email_register');
let $passwordRegistro = $('#password_register');
let $register = $('#register');
let $emailLogin = $('#email');
let $passwordLogin = $('#password');
let $login = $('#login');
// let $logout = $('#logout');


// funcion para el registo de usuarios nuevos
$register.on('click', function() {
  // const $fullName = $name.val() + ' ' + $apellido.val();
  const $fullName = `${$name.val()} ${$apellido.val()}`;
  // const prueba = $fullName;
  // const $name = $name.val();
  // const $apellido = $apellido.val();
  console.log($fullName);
  const $correo = $emailRegistro.val();
  const $password = $passwordRegistro.val();
  console.log($correo);
  console.log($password);
  const auth = firebase.auth();
  const registro = auth.createUserWithEmailAndPassword($correo, $password);
  registro.then((user) => {
    console.log(user);
    const newUser = auth.currentUser;
    const parametro = newUser.updateProfile({
      displayName: $fullName,
      email: $correo
    });
  })
    .catch(function(error) {
      // Mensaje en consola si existe error de registro
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });

  /* const registro = firebase.auth().createUserWithEmailAndPassword($correo, $password)
    .then().catch(function(error) {
      // Mensaje en consola si existe error de registro
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });*/
});

const datosUsuario1 = (user) =>{
  let database = firebase.database();
  let usuario = {
    uid: user.uid,
    nombre: user.displayName,
    correo: user.email,
    foto: user.photoURL
  };
  database.ref('Usuarios/' + user.uid)
    .set(usuario);
};


// funcion para iniciar sesion con correo y contrasena ya registrados
$login.on('click', function() {
  const $email = $emailLogin.val();
  const $password = $passwordLogin.val();
  console.log($email);
  console.log($password);

  const inicio = firebase.auth().signInWithEmailAndPassword($email, $password)
    .catch(function(error) {
    // Mensaje en consola si existe error de inicio de sesion
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert('Usuario o contraseña incorrectos');
    });
  observador();
});


// funcion para iniciar sesioon con Google
let providerg = new firebase.auth.GoogleAuthProvider();
$('#loginGoogle').click(function() {
  firebase.auth()
    .signInWithPopup(providerg)
    .then(function(result) {
      console.log(result.user);
      datosUsuario(result.user);
      // $('#loginGoogle').hide();
    });
  observador();
});


// funcion para iniciar sesion con facebook
let providerf = new firebase.auth.FacebookAuthProvider();
$('#loginFacebook').click(function() {
  firebase.auth()
    .signInWithPopup(providerf)
    .then(function(result) {
      console.log(result.user);
      datosUsuario(result.user);
      // $('#loginFacebook').hide();
    });
  observador();
});


// para configurar un observador de estado de autenticación y obtén datos del usuario
let observador = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('existe usuario activo');
      // User is signed in.
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
      console.log(user);
      muro();
    } else {
      console.log('no existe usuario activo');
    // User is signed out.
    }
  });
};
observador();

let muro = () => {
  location.href = 'views/view1.html';
};

// Funcion para guardar los datos del usuaio en Firebase
const datosUsuario = (user) =>{
  let database = firebase.database();
  let usuario = {
    uid: user.uid,
    nombre: user.displayName,
    correo: user.email,
    foto: user.photoURL
  };
  database.ref('Usuarios/' + user.uid)
    .set(usuario);
};
