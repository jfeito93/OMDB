const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const ObjectId = require("mongodb").ObjectID;
async function connection() {
  const client = await MongoClient(url, { useUnifiedTopology: true });
  client
    .connect()
    .catch((e) => console.log(e));
  //console.log(client);
  return client;
}
// AGREGAR VARIAS PELICULAS A LA COLECCIÓN DE PELICULAS DE LA BASE DE DATOS CREADA EN MONGODB:
exports.createMovie = async ({
  Title,
  Year,
  Runtime,
  Genre,
  Director,
  Actors,
  Plot,
  Poster,
  imdbRating
}) => {
  const client = await connection(); // Devuelve el objeto de conexion a la BBDD
  const result = await client
    .db("omdb")
    .collection("movies")
    .insertOne({
    Title: Title,
    Year: Year,
    Runtime: Runtime,
    Genre: Genre,
    Director: Director,
    Actors: Actors,
    Plot: Plot,
    Poster: Poster,
    imdbRating: imdbRating,
  });
  return result.insertedID;
};
// CREATE FILM LISTINGS:
//exports.createAdminMovies();
// READ
//readFilmDetails muestra todas las pelis mongo si no se introduce nada en la busqueda y si se introduce algo busca por los caracteres introducidos en relacion
exports.readAllMovies = async (title) => {
  let condition = `${/^$/}`; //si no se quiere usar la regex pues = ""
  if (title) {
    condition = { Title: new RegExp("^" + title, "i") };
  }
  let client = await connection();
  const result = await client
    .db("omdb")
    .collection("movies")
    .find(condition)
    .toArray();
  return result;
};
//exports.readAllMovies();
exports.getMovieById = async (id) => {
  let objetId1 = new ObjectId(id);
  let client = await connection();
  const result = await client
    .db("omdb")
    .collection("movies")
    .findOne({ _id: objetId1 });
  return result;
};
//exports.getMoviesById("601ab13b295c8159cc461dca");

// MODIFICAR VALORES DE UNA PELICULA DE LA COLECCIÓN DE PELICULAS DE LA BASE DE DATOS CREADA EN MONGODB:
exports.updateFilmDetails = async (
  id,
  { Title, Year, Runtime, Genre, Director, Actors, Plot, Poster, imdbRating }
) => {
  let client = await connection();
  const result = await client
    .db("omdb")
    .collection("movies")
    .updateOne(
      { _id: id },
      {
        $set: {
          Title: Title,
          Year: Year,
          Tuntime: Runtime,
          Genre: Genre,
          Director: Director,
          Actors: Actors,
          Plot: Plot,
          Poster: Poster,
          imdbRating: imdbRating,
        },
      }
    );
  console.log("Listing values updated");
  return result;
};
// UPDATE FILM LISTINGS VALUES:
//exports.updateFilmDetails();
// ELIMINAR VALORES DE UNA PELICULA DE LA COLECCIÓN DE PELICULAS DE LA BASE DE DATOS CREADA EN MONGODB:
exports.deleteFilmDetails = async () => {
  let client = await connection();
  const result = await client
    .db("omdb")
    .collection("movies")
    .updateOne(
      { Title: "Bbbb" },
      { $unset: { Rated: "+16", Runtime: "90 min" } }
    );
  console.log("Listing values updated");
  return result;
};
// UPDATE FILM LISTINGS VALUES:
//exports.deleteFilmDetails();
// ELIMINAR UNA PELICULA DE LA COLECCIÓN DE PELICULAS DE LA BASE DE DATOS CREADA EN MONGODB:
exports.deleteFilm = async () => {
  let client = await connection();
  const result = await client
    .db("omdb")
    .collection("movies")
    .deleteOne({ Title: "Bbbb" });
  console.log("Listing deleted");
  return result;
};
// DELETE FILM LISTING:
