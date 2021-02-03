const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const ObjectId = require("mongodb").ObjectID;

async function connection() {
  const client = await MongoClient(url, { useUnifiedTopology: true });
  client
    .connect()
    .then(() => console.log("Connected to the db"))
    .catch((e) => console.log(e));
  //console.log(client);
  return client;
}
// PROBAR LA CONEXION:
//connection();

// AGREGAR UNA PELICULA A LA COLECCIÓN DE PELICULAS DE LA BASE DE DATOS CREADA EN MONGODB:
exports.createAdminMovie = async () => {
  const client = await connection(); // Devuelve el objeto de conexion a la BBDD
  const result = await client.db("omdb").collection("movies").insertOne({
    Title: "Bbbb",
    Year: "1998",
    Rated: "+16",
    Runtime: "90 min",
    Genre: "Comedy",
    Director: "Charles Manson",
    Actors: "Borgen The Destructor, La Veneno",
    Plot:
      "Los bbs de la isla se encuentran bailando, bailando, bailando, bailando.",
    Poster: "https://i.imgur.com/fCcpb2Z.jpg",
    imdbRating: "3/5",
    imdbID: "randomNumber2",
    Response: "True",
  });
  // `New listing created with the following id: ${result.insertedId}` - PARA LA CREACION DE UNA LISTA CON SU ID UNICO
  console.log("New listing created");
  //return result.insertedId; - PARA LA CREACION DE UNA LISTA CON SU ID UNICO
  return result;
};
// CREATE FILM LISTING:
//exports.createAdminMovie();

// AGREGAR VARIAS PELICULAS A LA COLECCIÓN DE PELICULAS DE LA BASE DE DATOS CREADA EN MONGODB:
exports.createAdminMovies = async () => {
  const client = await connection(); // Devuelve el objeto de conexion a la BBDD
  const result = await client
    .db("omdb")
    .collection("movies")
    .insertMany([
      {
        Title: "Aaaa",
        Year: "2001",
        Rated: "All ages",
        Runtime: "69 min",
        Genre: "Childish",
        Director: "Bob Spongebob",
        Actors: "La Vecina, Pepe Pelotas",
        Plot:
          "Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.",
        Poster: "https://i.imgur.com/fCcpb2Z.jpg",
        imdbRating: "1/5",
        imdbID: "randomNumber1",
        Response: "True",
      },
      {
        Title: "Bbbb",
        Year: "1998",
        Rated: "+16",
        Runtime: "90 min",
        Genre: "Comedy",
        Director: "Charles Manson",
        Actors: "Borgen The Destructor, La Veneno",
        Plot:
          "Los bbs de la isla se encuentran bailando, bailando, bailando, bailando.",
        Poster: "https://i.imgur.com/fCcpb2Z.jpg",
        imdbRating: "3/5",
        imdbID: "randomNumber2",
        Response: "True",
      },
      {
        Title: "Cccc",
        Year: "2016",
        Rated: "+18",
        Runtime: "85 min",
        Genre: "None",
        Director: "El Fary",
        Actors: "Simon Bolivar, Robert DeNiro",
        Plot:
          "Evo Morales is a Panadero from Uzbekistan who goes on a quest to find an Inutil Dignidad, but first must overcome a mermaid version of Charles Manson. Evo Morales teams up with a superhero called Velero-Man, whose special power is extreme Fracasar.",
        Poster: "https://i.imgur.com/fCcpb2Z.jpg",
        imdbRating: "5/5",
        imdbID: "randomNumber3",
        Response: "True",
      },
    ]);
  console.log("New listings created");
  return result;
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
  console.log(result);
  return result;
};
//exports.readAllMovies();

exports.getMoviesById = async (id) => {
  let objetId1 = new ObjectId(id);
  let client = await connection();
  const result = await client
    .db("omdb")
    .collection("movies")
    .find({ _id: objetId1 })
    .toArray();
  console.log(result);
  return result;
};
//exports.getMoviesById("601ab13b295c8159cc461dca");


// MODIFICAR VALORES DE UNA PELICULA DE LA COLECCIÓN DE PELICULAS DE LA BASE DE DATOS CREADA EN MONGODB:
exports.updateFilmDetails = async () => {
  let client = await connection();
  const result = await client
    .db("omdb")
    .collection("movies")
    .updateOne({ Title: "Cccc" }, { $set: { Year: "2018", Genre: "Drama" } });
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
//exports.deleteFilm();
