 // Variables del DOM vista1
 let textInput = document.getElementById('publicText'); // input de publicacion
 let publicButton = document.getElementById('publicButton'); // boton de publicacion
 let cardPublication = document.getElementById('cardPublication'); // caja de la publicacion
 let heart = document.getElementById('heart');
 let edit = document.getElementById('edit');
 let delet = document.getElementById('delet');
 
 // Variables para Usuario
 let logedUser = document.getElementById('logedUser');
 let userProfile = document.getElementById('userProfile');
 let userHome = document.getElementById('userHome');
 let userExit = document.getElementById('userExit');
 let pPhoto = document.getElementById('pPhoto');
 let pName= document.getElementById('pName');
 let pEmail = document.getElementById('pEmail');
 
 // Variables globales 
 let welcomeUser;

const getPost = () => {
  publicButton.addEventListener('click', saveData = () =>{
    const userActive = firebase.auth().currentUser;
    const textPost = textInput.value;
    if (textPost == '') {
      alert('No ingresaste nada😥, mejor compartenos que tienes en tu refri y presiona Enviar 👍');
    } else {
      const newMessageKey = firebase.database().ref().child('Mensajes').push().key;
    let update = {
      user:userActive.uid,
      userName:userActive.displayName,
      post:textPost
    }
    firebase.database().ref(`Mensajes/${newMessageKey}`).set(update);
    document.getElementById('publicText').value = '';      
    }    
  });
  };

  const pruebaDeNombre = (user) => {
  const checkUser = firebase.auth().currentUser;
  welcomeUser = checkUser.displayName;
  logedUser.innerHTML = "Hola" + " " + welcomeUser;
} 
// Sirve pero da undefind para el nombre del usuario// logedUser.innerHTML = "Hola" + " " + welcomeUser + " " + "comparte tu receta";

const getProfileUser = () => {
  firebase.auth().onAuthStateChanged( checkStatusUser = (user) => {
    if (user){
      let pruebaName = user.displayName;
      let pruebaEmail = user.email;
      let pruebaPhoto = user.photoURL  || 'https://sss.ukzn.ac.za/wp-content/uploads/2017/12/profile-placeholder.png';
      pName.textContent = pruebaName;
      pEmail.textContent = pruebaEmail;
      pPhoto.style.background = 'url('+pruebaPhoto+')'
    }
    pruebaDeNombre();
  })

  firebase.database().ref('Mensajes')
  .on('child_added', (newMessage)=>{
    cardPublication.innerHTML += 
    `<div id="cardPublication" class="card publication">
      <div  class="card-body">
        <p>${newMessage.val().userName}</p>
        <p>${newMessage.val().post}</p>
        <div class="text-right">
          <a id="heart" class="a-like-btn" href="#"><i class="fas fa-heart like-btn"></i></a>
          <a id="edit" class="btn btn-secondary form-button" href="#">Editar</a>
          <a id= "delet" class="btn btn-danger form-button" href="#">Borrar</a>
        </div>
      </div> 
    </div>`
})

}
/* userProfile.addEventListener('click', showUser = () => {
  alert('Aquí irá el modal');
}) */

 userHome.addEventListener('click', showHome = () => {
  location.href = '../views/view1.html';
}) 

userExit.addEventListener('click', showExit = () => {
  location.href = '../index.html';
}) 


window.onload = function () {
  getPost();
  getProfileUser();
  //pruebaDeNombre();
}
