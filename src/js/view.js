// Variables del DOM vista1
let textInput = document.getElementById('publicText'); // input de publicacion
let publicButton = document.getElementById('publicButton'); // boton de publicacion
let cardPublication = document.getElementById('cardPublication'); // caja de la publicacion
let photoButton = document.getElementById('photoButton');

// Variables para Usuario
let logedUser = document.getElementById('logedUser');
let userProfile = document.getElementById('userProfile');
let userHome = document.getElementById('userHome');
let userExit = document.getElementById('userExit');
let pPhoto = document.getElementById('pPhoto');
let pName = document.getElementById('pName');
let pEmail = document.getElementById('pEmail');
let profileImage = document.getElementById('profile-image');

//  //Variables para Post
//  let edit = document.getElementById('edit');
//  let delet = document.getElementById('delet');


// Variables globales
let welcomeUser;

const getPost = () => {
  publicButton.addEventListener('click', saveData = () =>{
    const userActive = firebase.auth().currentUser;
    const textPost = textInput.value;
    if (textPost === '') {
      alert('No ingresaste nada��, compartenos que tienes en tu refri y presiona Publicar ��');
    } else {
      const newMessageKey = firebase.database().ref().child('Mensajes').push().key;
      let update = {
        user: userActive.uid,
        userName: userActive.displayName,
        post: textPost
      };
      firebase.database().ref(`Mensajes/${newMessageKey}`).set(update);
      document.getElementById('publicText').value = '';
    }
  });
};

const welcomeUserPost = (user) => {
  const checkUser = firebase.auth().currentUser;
  welcomeUser = checkUser.displayName;
  logedUser.innerHTML = 'Hola' + ' ' + welcomeUser;
};

const getProfileUser = () => {
  firebase.auth().onAuthStateChanged(checkStatusUser = (user) => {
    if (user) {
      let pruebaName = user.displayName;
      let pruebaEmail = user.email;
      let pruebaPhoto = user.photoURL || 'https://sss.ukzn.ac.za/wp-content/uploads/2017/12/profile-placeholder.png';
      pName.textContent = pruebaName;
      pEmail.textContent = pruebaEmail;
      profileImage.setAttribute('src', pruebaPhoto + '?type=large');
    }
    welcomeUserPost();
  });

  firebase.database().ref('Mensajes')
    .on('child_added', (newMessage)=>{
      cardPublication.innerHTML +=
    `<div id="cardPublication" class="card publication">
      <div  class="card-body">
        <p>${newMessage.val().userName}</p>
        <p>${newMessage.val().post}</p>
        <div class="text-right">
        </div>
      </div>
    </div>`;
    });
//  //Variables para Post
//  let edit = document.getElementsByClassName('edit');
//  let delet = document.getElementsByClassName('delet');
// delet.addEventListener('click', event =>{
//   alert();
// })
};

userHome.addEventListener('click', showHome = () => {
  location.href = '../views/view1.html';
});

userExit.addEventListener('click', showExit = () => {
  firebase.auth().signOut()
    .then(function() {
      console.log('Saliendo...');
    }).catch(function(error) {
      console.log('error');
    });
  location.href = '../index.html';
});


window.onload = function() {
  getPost();
  getProfileUser();
};
