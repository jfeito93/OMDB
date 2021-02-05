const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const ObjectId = require("mongodb").ObjectID;

async function connection() {
  const client = await MongoClient(url, { useUnifiedTopology: true });
  client
    .connect()
    .catch((e) => console.log(e));
  return client;
}
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
  const client = await connection(); 
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

exports.readAllMovies = async (title) => {
  let condition = `${/^$/}`; 
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

exports.getMovieById = async (id) => {
  let movieID = new ObjectId(id);
  let client = await connection();
  const result = await client
    .db("omdb")
    .collection("movies")
    .findOne({ _id: movieID});
  return result;
};

exports.updateFilmDetails = async (
  id,
  { Title, Year, Runtime, Genre, Director, Actors, Plot, Poster, imdbRating }
) => {
  let movieID = new ObjectId(id);
  let client = await connection();
  const result = await client
    .db("omdb")
    .collection("movies")
    .updateOne(
      { _id: movieID },
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
  console.log(result);
  return result;
};

exports.deleteFilm = async (id) => {
  let movieID = new ObjectId(id);
  let client = await connection();
  const result = await client
    .db("omdb")
    .collection("movies")
    .deleteOne({ _id: movieID });
  console.log("Listing deleted");
  return result;
};