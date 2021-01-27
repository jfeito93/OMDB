//*Almacenamos todos los valores del DOM a los que nos vamos a referir luego
const userEmail = document.getElementById("_email");
const userPW = document.getElementById("_pw");
//*Almacenamos las Expresiones regulares con las que vamos a validar el input del usuario
const RegExEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

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
    let data = { email: userEmail.value, pw: userPW.value };
    fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status){
          window.location.href='/';
        }
        //TODO instrucción al CSS
        console.log(data.mensaje)
      })
      .catch((error) => console.error("Error:", error));

    //? Después del POST a /login res.redirect a /dashboard
  } else {
    //* Si la contraseña no es válida pedimos que la escriban de nuevo
    console.log("Esccribe una contraseña");
  }
};
//* Llamamos a Firebase.Auth()
//const logInGoogle = () {
//*Se pinta la interfaz de Auth
//*Se registra/inicia sesión
//* POST a /login con los datos

//}
//* 1 Escuchamos si se logean por ruta JWT
document.addEventListener("submit", (event) => checkMail(event));
//* 2 Escuchamos si se logean por ruta Firebase.Auth() con Google
//document.querySelector('article > button')addEventListener("click", )
