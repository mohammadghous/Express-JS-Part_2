const express = require("express");
const app = express();
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

let dbpath = path.join(__dirname, "goodreads.db");

let db = null;

const initialiseDbAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initialiseDbAndServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    SELECT *
    FROM 
    book
    ORDER BY book_id;
    `;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
