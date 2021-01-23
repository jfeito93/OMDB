//* Guardar todos los elementos del DOM que se van a rellenar con el JSON
//const img = document.querySelector(div.wrapper > 'img');
//const rating = document.querySelector('div.wrapper > span');
//const title = doicument.querySelector('div.wrapper > h2');
//const director = doicument.querySelector('div.wrapper > h4');
//const genre = doicument.querySelector('div.wrapper > p:nth-child(1)');
//const duration = doicument.querySelector('div.wrapper > p:nth-child(2)');
//const cast = doicument.querySelector('div.wrapper > p:nth-child(3)');
//const plot = doicument.querySelector('div.wrapper > p:nth-child(4)');
//const fav = doicument.querySelector('div.wrapper > a');
//*Un boolean que nos permita saber si el usuario ha marcado esta película como favorita
//let isFav = false;
//*GET a /search/:title
// fetch(/search/:title)
//  .then(res => res.json())
//  .then(movie => {
        //* Se cogen los datos de la respuesta
//      img.setAttribute('src', movie.Poster);
//      rating.innerHTML = createTextNode(movie.Rating);
//      title.innerHTML = `${movie.Title}(${movie.Year})`;
//      genre.innerHTML = createTextNode(movie.Genre);
//      duration.innerHTML = createTextNode(movie.Duration);
//      plot.innerHTML = createTextNode(movie.Plot);
        //*Si esta marcada como favorita se colorea el botón
//      if (movie.favourite){
//          fav.classList = 'favourite';
//          isFav = true;
//      }
//  })
//*El usuario marca como favorita una peli
//const isFavourite = () => {
    //*El color de la estrella responde al input del usuario
//  fav.classList.toggle('favourite')
//  if(isFav){
        //*Si marca la peli cómo favorita, se añade esta peli a sus peliculas guardadas
//      POST a /movies
//  }else{
        //*Si quita esta peli de favoritos, se quita la peli de sus peliculas guardadas
//      DELETE a / movies
//  }
//}
//*Escuchamos el botón de favorito
//fav.addEventListener("click", isFavourite);