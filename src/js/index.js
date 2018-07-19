
// login con google
let provider = new firebase.auth.GoogleAuthProvider();
// sintaxis de jquery $('') se adiere a las etiquetas de html (#id)
$('#loginGoogle').click(function() {
  firebase.auth()
    .signInWithPopup(provider)
    .then(function(result) {
      console.log(result.user);
      $('#loginGoogle').hide();
    });
});

// let $email = $('#email');
// let $password = $('#password');
// let $register = $('#register');
// let $logout = $('#logout');
// let $login = $('#login');
//
// $login.on('click', function() {
//   const email = $email.val();
//   const password = $password.val();
//   const authentication = firebase.auth();
//   const promise = auth.signInWhithEmailAndPassword(email, password);
// });

const email = document.getElementById('email');
const password = document.getElementById('password');
const register = document.getElementById('register');
const logout = document.getElementById('logout');
const login = document.getElementById('login');

// login.addEventListener('click', event => {
//   const correo = email.value;
//   const contraseña = password.value;
//   const auth = firebase.auth().auth.signInWhithEmailAndPassword(correo, contraseña)
//     .catch(function(error) {
//     });
