// Elementos del DOM
let name = document.getElementById('name');
let apellido = document.getElementById('last_name');
let emailRegistro = document.getElementById('email_register');
let passwordRegistro = document.getElementById('password_register');
let register = document.getElementById('register');
let emailLogin = document.getElementById('emailLogin');
let passwordLogin = document.getElementById('passwordLogin');
let login = document.getElementById('login');

// funcion para el registo de usuarios nuevos
register.addEventListener('click', registerFunction = () => {
  // const fullName = name.value + ' ' + apellido.value;
  const fullName = `${name.value} ${apellido.value}`;
  console.log(fullName);
  const correo = emailRegistro.value;
  const password = passwordRegistro.value;
  console.log(correo);
  console.log(password);
  const auth = firebase.auth();
  const registro = auth.createUserWithEmailAndPassword(correo, password);
  registro.then((user) => {
    console.log(auth.currentUser);
    const newUser = auth.currentUser;
    newUser.updateProfile({
      displayName: fullName,
      email: correo
    }).then(() => {
      console.log(newUser);
      datosUsuario1(newUser);
      alert('Te has registrado correctamente.  Inicia sesión con tu correo y contraseña');
    })
      .catch(function(error) {
      // Mensaje en consola si existe error de registro
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    // observador();
  });
});

const datosUsuario1 = (user) =>{
  let newUser = user;
  console.log(newUser.displayName);
  let database = firebase.database();
  let usuario = {
    uid: user.uid,
    nombre: user.displayName,
    correo: user.email,
    foto: user.photoURL || 'https://sss.ukzn.ac.za/wp-content/uploads/2017/12/profile-placeholder.png',
  };
  console.log(usuario);
  database.ref('Usuarios/' + user.uid)
    .set(usuario);
};

// funcion para iniciar sesion con correo y contrasena ya registrados
login.addEventListener('click', loginfunction = () => {
  const email = emailLogin.value;
  const password = passwordLogin.value;
  console.log(email);
  console.log(password);
  const inicio = firebase.auth().signInWithEmailAndPassword(email, password)
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

let loginGoogle = document.getElementById('loginGoogle');
// funcion para iniciar sesioon con Google
let providerg = new firebase.auth.GoogleAuthProvider();
loginGoogle.addEventListener('click', providerGoogle = () => {
  firebase.auth()
    .signInWithPopup(providerg)
    .then(function(result) {
      console.log(result.user);
      datosUsuario(result.user);
    });
  observador();
});


let loginFacebook = document.getElementById('loginFacebook');
// funcion para iniciar sesion con facebook
let providerf = new firebase.auth.FacebookAuthProvider();
loginFacebook.addEventListener('click', providerFacebook = () => {
  firebase.auth()
    .signInWithPopup(providerf)
    .then(function(result) {
      console.log(result.user);
      datosUsuario(result.user);
    });
  observador();
});


// para configurar un observador de estado de autenticación y obtén datos del usuario
let observador = () => {
  firebase.auth().onAuthStateChanged(whatcher = (user) => {
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
      muro();
    } else {
      console.log('no existe usuario activo');
    // User is signed out.
    }
  });
};
// observador();

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
