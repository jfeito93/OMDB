//*Almacenamos en el DOM todos los campos que vamos a tener que validar
const title = document.querySelector('form > input[name="title"]');
const year = document.querySelector('form > input[name="year"]');
const director = document.querySelector('form > input[name="director"]');
const cast = document.querySelector('form > input[name="cast"]');
const genre = document.querySelector('form > input[name="genre"]');
const duration = document.querySelector('form > input[name="duration"]');
const rating = document.querySelector('form > input[name="rating"]');
const plot = document.querySelector('form > input[name="plot"]');
const img = document.querySelector('form > input[name="img"]');
const fields = [title, year, director, cast, genre, duration, rating, plot, img];

function check (e) {
  e.preventDefault();
  for(i = 0; i < fields.length; i++){
    if (fields[i].value){
       console.log(fields[i].value)
    }else{
      fields[i].classList.toggle('error');
      return
    }
  }
    fetch("http://localhost:3000/createMovie", {
        Accept: 'application/json',
        method: "POST",
        body: JSON.stringify({
          Title: title.value,
          Year: year.value,
          Runtime: duration.value,
          Director: director.value,
          Actors: cast.value,
          Plot: plot.value,
          Poster: img.value,
          imdbRating: rating.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(res => res.json())
      .then(() => {
        window.location.assign('/movies')
      })
      .catch((error) => console.error("Error:", error));
}

document.body.addEventListener('submit', (e) => check(e))
