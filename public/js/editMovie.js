//*Almacenamos en el DOM todos los campos que vamos a tener que validar
const title = document.querySelector('form > input[name="title"]');
const year = document.querySelector('form > input[name="year"]');
const director = document.querySelector('form > input[name="director"]');
const actors = document.querySelector('form > input[name="actors"]');
const genre = document.querySelector('form > input[name="genre"]');
const runtime = document.querySelector('form > input[name="runtime"]');
const imdbRating = document.querySelector(
  'form > input[name="imdbRating"]'
);
const plot = document.querySelector('form > input[name="plot"]');
const poster = document.querySelector('form > input[name="poster"]');
const fields = [
  title,
  year,
  director,
  actors,
  genre,
  runtime,
  imdbRating,
  plot,
  poster,
];
const submit = document.querySelector('form > input[type="submit"]');
function check(event) {
  event.preventDefault();
  for (let i = 0; i < fields.length; ++i) {
    if (fields.value) {
      return;
    } else if (i == fields.length) {
      fetch("http://localhost:3000/createMovie", {
        Accept: "application/json",
        method: "POST",
        body: JSON.stringify({
          Title: title.value,
          Year: year.value,
          Runtime: runtime.value,
          Genre: genre.value,
          Director: director.value,
          Actors: actors.value,
          Plot: plot.value,
          Poster: poster.value,
          imdbRating: imdbRating.value
        })})
        .then(res = res.json())
        .then((data) => {
          window.location.assign('/movies')
        }).catch(err => console.error(err))
    } else {
      fields[i].classList.toggle('error');
      break;
    }
  }
};
document.body.addEventListener("submit", (event) => check(event));
