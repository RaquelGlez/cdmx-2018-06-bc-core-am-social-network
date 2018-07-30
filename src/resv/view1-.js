let config = {
  apiKey: 'AIzaSyBURBUsmSksVn1nbBWquIWIamJlXlXTaCQ',
  authDomain: 'diy-de-firebase.firebaseapp.com',
  databaseURL: 'https://diy-de-firebase.firebaseio.com',
  projectId: 'diy-de-firebase',
  storageBucket: 'diy-de-firebase.appspot.com',
  messagingSenderId: '184356921265'
};
firebase.initializeApp(config);


let textInput = document.getElementById('publicText'); // input de publicacion
let publicButton = document.getElementById('publicButton'); // boton de publicacion
let cardBody = document.getElementById('cardBody'); // caja de la publicacion
let heart = document.getElementById('heart');
let edit = document.getElementById('edit');
let delet = document.getElementById('delet');

// let refPub;
// función para mostrar el perfin del usuario
const segundaPruebapParaUsuario = () => {
  firebase.auth().onAuthStateChanged( checkStatusUser = (user) => {
    if (user) {
      let pruebaName = user.displayName;
      let pruebaEmail = user.email;
      let pruebaPhoto = user.photoURL || 'https://sss.ukzn.ac.za/wp-content/uploads/2017/12/profile-placeholder.png';
      pName.textContent = pruebaName;
      pEmail.textContent = pruebaEmail;
      pPhoto.style.background = 'url('+pruebaPhoto+')'
    };
  });
};

// funcion para guardar el post en la base de datos
const getPost = () => {
  publicButton.addEventListener('click', saveData = () =>{
    const currentUser = firebase.auth().currentUser;
    const textPost = textInput.value;
    const newMessageKey = firebase.database().ref().child('Mensajes').push().key;
    firebase.database().ref(`Mensajes/${newMessageKey}`).set({
      user: currentUser.uid,
      userName: currentUser.displayName,
      post: textPost
    });
  });
};


window.onload = function() {
  getPost();
  segundaPruebapParaUsuario();
};
// window.onload = getPost;
