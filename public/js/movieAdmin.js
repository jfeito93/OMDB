//*Almacenamos en el DOM todos los campos que vamos a tener que validar
//const title = document.querySelector(div.wrapper > input[type=text]:nth-child(1));
//const year = document.querySelector('form > input[type=text]:nth-child(2)');
//const director = doicument.querySelector('form > input[type=text]:nth-child(3)');
//const cast = doicument.querySelector('form > input[type=text]:nth-child(4)');
//const genre = doicument.querySelector('form > input[type=text]:nth-child(5)');
//const duration = doicument.querySelector('form > input[type=text]nth-child(6)');
//const rating = doicument.querySelector('form > input[type=text]:nth-child(7)');
//const plot = doicument.querySelector('form > input[type=text]:nth-child(8)');
//const img = doicument.querySelector('form > input[type=file]');
//?ALmacenamos las expresiones regulares con las que tengamos que validar
//*Si editamos, GET a /search/:title
//*Si creamos, que se en blanco
//*Validar campo 1
/* function checkField1 (event) {
    event.preventDefault();
    if(lleno){
        //Siguiente campo
    }else{
        //Cancelo
    }
} */
    //* Si está vacío, cancelar
    //* Si esta lleno, siguiente Campo
//*Validar campo 2
    //* Si está vacío, cancelar
    //* Si esta lleno, siguiente Campo
//*Validar campo 3
    //* Si está vacío, cancelar
    //* Si esta lleno, siguiente Campo
//*Validar campo 4
    //* Si está vacío, cancelar
    //* Si esta lleno, siguiente Campo
//*Validar campo 5
    //* Si está vacío, cancelar
    //* Si esta lleno, siguiente Campo
//*Validar campo 6
    //* Si está vacío, cancelar
    //* Si esta lleno, siguiente Campo
//*Validar campo 7
    //* Si está vacío, cancelar
    //* Si esta lleno, siguiente Campo
//*Validar campo 8
    //* Si está vacío, cancelar
    //* Si esta lleno, siguiente Campo
//*Validar campo 9
    //* Si está vacío, cancelar
    //* Si esta lleno, event.target.submit()
//*Escuchamos Cuando se da submit al formulario, y empezamos a validar

//* hacer un bucle de 10 funciones - con while - mientras el campo este vacio haz esto diez veces

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