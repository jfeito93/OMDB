//*Almacenamos todos los valores del DOM a los que nos vamos a referir luego
//const userEmail = document.querySelector('input[type=email]');
//const userPW = document.querySelefctor('input[type=password'):
//*Almacenamos las Expresiones regulares con las que vamos a validar el input del usuario
//RegEx para email
//RegEx para contraseña
//* Validamos el mail que han introducido
//const checkMail = event =>{
//  event.preventDefault();
//  if(RegExEmail.test(userEmail.value)){
        //* Si el mail es válido pasamos a corregir la contraseña
//      checkPW(event);
//  }else{
        //* Si el mail no es válido pedimos que se escriba de nuevo
//      El émail no es válido
//  }
//}
//* Validamos la contraseña
// const chekPW = event => {
//  if(RegExPw.test(userPw.value)){
        //* Si la contraseña es válida mandamos los datos al servidor
//      fetch(/login POST)
//          .then( res => res.json())
//          .then( data => {
//              event.target.submit
//      })
//          .catch( err => console.error(err))
        //? Después del POST a /login res.redirect a /dashboard
//  }else{
        //* Si la contraseña no es válida pedimos que la escriban de nuevo
//      contraseña no válida
//  }
//}
//* Llamamos a Firebase.Auth()
//const logInGoogle = () {
   //*Se pinta la interfaz de Auth
   //*Se registra/inicia sesión
   //* POST a /login con los datos

//}
//* 1 Escuchamos si se logean por ruta JWT
//document.addEventListener("submit", event => checkMail(event))
//* 2 Escuchamos si se logean por ruta Firebase.Auth() con Google
//document.querySelector('article > button')addEventListener("click", )
