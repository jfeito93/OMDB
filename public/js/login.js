//*Almacenamos todos los valores del DOM a los que nos vamos a referir luego
const userEmail = document.getElementById("_email");
const userPW = document.getElementById("_pw");
//*Almacenamos las Expresiones regulares con las que vamos a validar el input del usuario
const RegExEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const firebaseConfig = {
  apiKey: "AIzaSyBoOY8gJtdfN-cJavo6HWjB_yX3xTfST2A",
  authDomain: "omdb-78210.firebaseapp.com",
  projectId: "omdb-78210",
  storageBucket: "omdb-78210.appspot.com",
  messagingSenderId: "216822047855",
  appId: "1:216822047855:web:3c24d5109023405646d99a"
};
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
async function signOut() {
  let auth2 = await gapi.auth2.getAuthInstance();
  auth2.signOut()
}
//* Validamos el mail que han introducido
const checkMail = (event) => {
  event.preventDefault();
  if (RegExEmail.test(userEmail.value)) {
    //* Si el mail es válido pasamos a corregir la contraseña
    checkPW(event);
  } else {
    //* Si el mail no es válido pedimos que se escriba de nuevo
    //TODO esto hay que cambiarlo a CSS
    console.log("El émail no es válido");
  }
};

//* Validamos la contraseña
const checkPW = (event) => {
  if (userPW.value) {
    //* Si la contraseña es válida mandamos los datos al servidor
    fetch("http://localhost:3000/login", {
        Accept: 'application/json',
        method: "POST",
        body: JSON.stringify({
          'data':{
            'pw': userPW.value,
            'email':userEmail.value
          }
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res => res.json())
      .then((data) => {
        console.log(data);
        if (data.status) {
          window.location.assign('/');
        }
        //TODO instrucción al CSS
      })
      .catch((error) => console.error("Error:", error));

    //? Después del POST a /login res.redirect a /dashboard
  } else {
    //* Si la contraseña no es válida pedimos que la escriban de nuevo
    console.log("Esccribe una contraseña");
  }
};


async function onSignIn(googleUser) {

  let firebaseToken = await googleUser.getAuthResponse().id_token;
  let userMail = await googleUser.getBasicProfile().getEmail();
  let credential = await firebase.auth.GoogleAuthProvider.credential(firebaseToken);

  // Sign in with credential from the Google user.
  firebase
    .auth()
    .signInWithCredential(credential)
    .then(({user}) => {
      return user.getIdToken().then(idToken => {
        return fetch('http://localhost:3000/login', {
          method: 'POST',
          body: JSON.stringify({
            'data': {
              'gToken': idToken,
              'email': userMail,
            }
          }),
          headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
          }
        });
      })
    }).then(() => {
      console.log("I'm doing this")
      return firebase.auth().signOut().then(() => {
        window.location.href = '/';
      }).catch((error) => {
        // An error happened.
      });
    });
}
//! Google Client Secret ZixZyV4qaFwapQbrNCMmjL-Z
//* 1 Escuchamos si se logean por ruta JWT
document.addEventListener("submit", (event) => checkMail(event));