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

let refPub;

const getPost = () => {
  publicButton.addEventListener('click', saveData = () =>{
    const currentUser = firebase.auth().currentUser;
    const textPost = textInput.value;
    const newMessageKey = firebase.database().ref().child('Mensajes').push().key;
    firebase.database().ref(`Mensajes/${newMessageKey}`).set({
      user:currentUser.uid,
      userName: currentUser.displayName,
      post:textPost
    });
  });
};


//
// // funcion para detonar el evento de generar la publicacion
// const init = () => {
//   publicButton.addEventListener('click', sendPublicationFirebase);
//   refPub = firebase.database().ref().child('Publicaciones');
// };
//
// // funcion para crear el elemento del Mensaje
// /*const createNewPubElement = (pubString) => {
//
// }*/
//
// // funcion para enviar las publicaciones a firebase
// const sendPublicationFirebase = () => {
//   console.log(refPub);
//   refPub.push({
//     mensaje: textInput.value
//   })
// }



/*comentarioUsuario = () => {
  publicButton.addEventListener('click', publicacion = () => {
    let databaseComen = firebase.database();
    let usuarioMen = {
      mensaje: textInput.value
    };
    databaseComen.ref('Publicaciones')
      .push(usuarioMen);
  });
};*/

 window.onload = getPost;