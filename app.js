const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
let db = null;
const dbPath = path.join(__dirname, "moviesData.db");

const initializeDbServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Started at localhost:3000");
    });
  } catch (e) {
    console.log(`DbServer Error: ${e.message}`);
    process.exit(1);
  }
};

app.use(express.json());

// API 1
app.get("/movies/", async (request, response) => {
  const getMoviesQuery = `
        select *
        from movie
        order By movie_id
    `;
  const moviesArray = await db.all(getMoviesQuery);
  response.send(moviesArray);
});

initializeDbServer();

module.exports = app;
