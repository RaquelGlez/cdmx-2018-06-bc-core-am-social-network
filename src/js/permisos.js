const credentials = () => {
  let config = {

      apiKey: 'AIzaSyBURBUsmSksVn1nbBWquIWIamJlXlXTaCQ',
      authDomain: 'diy-de-firebase.firebaseapp.com',
      databaseURL: 'https://diy-de-firebase.firebaseio.com',
      projectId: 'diy-de-firebase',
      storageBucket: 'diy-de-firebase.appspot.com',
      messagingSenderId: '184356921265'
    };
    firebase.initializeApp(config);
}

    apiKey: 'AIzaSyBURBUsmSksVn1nbBWquIWIamJlXlXTaCQ',
    authDomain: 'diy-de-firebase.firebaseapp.com',
    databaseURL: 'https://diy-de-firebase.firebaseio.com',
    projectId: 'diy-de-firebase',
    storageBucket: 'diy-de-firebase.appspot.com',
    messagingSenderId: '184356921265'
  };
  firebase.initializeApp(config);
};


window.onload = credentials();
