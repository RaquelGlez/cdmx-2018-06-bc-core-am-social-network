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

let $email = $('#email');
let $password = $('#password');
let $register = $('#register');
let $logout = $('#logout');
let $login = $('#login');

$register.on('click', function() {
  const correo = $email.val();
  const password = $password.val();
  const registro = firebase.auth().createUserWithEmailAndPassword(correo, password)
    .catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
});

$login.on('click', function() {
  const email = $email.val();
  const password = $password.val();
  const inicio = firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
});
