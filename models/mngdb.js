const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const ObjectId = require("mongodb").ObjectID;

async function connection() {
  const client = await MongoClient(url, { useUnifiedTopology: true });
  client
    .connect()
    .then(() => console.log("Connected to the db"))
    .catch((e) => console.log(e));
  console.log(client);
  return client; // Objeto de conexiona a la BBDD
}
// Probar la conexion:
//* connection();

// CREATE
createAdminFilmList = async (details) => {
  const client = await connection(); // Devuelve el objeto de conexion a la BBDD
  const result = await client
    .db("OMDB")
    .collection("AdminFilmList")
    .insertOne(details);
  // console.log(
  //   `New listing created with the following id: ${result.insertedId}`
  // );
  return result.insertedId;
};
let filmDetails = {
  Title: "Sindrome of a Down",
  Year: "666",
  Rated: "+18",
  Runtime: "69 min",
  Genre: "None",
  Director: "Charles Manson, Bob Spongebob(co-director)",
  Actors: "Simon Bolivar, La Vecina, Borgen The Destructor, Pepe Pelotas",
  Plot:
    "Evo Morales is a Panadero from Uzbekistan who goes on a quest to find an Inutil Dignidad, but first must overcome a mermaid version of Charles Manson. Evo Morales teams up with a superhero called Velero-Man, whose special power is extreme Fracasar.",
  Poster: "https://i.imgur.com/fCcpb2Z.jpg",
  imdbRating: "100x100",
  imdbID: "Yes",
  Response: "True",
};
//* Create film
//! createAdminFilmList(filmDetails);

// READ
exports.readFilmDetails = async (id) => {
  let objetId1 = new ObjectId(id);
  let client = await connection();
  const result = await client
    .db("OMDB")
    .collection("AdminFilmList")
    .findOne({ _id: objetId1 })
    //.toArray(); si antes = .find({ _id: objetId1 })
  // console.log(result);
  return result;
};
//* Read Film
//readFilmDetails();
