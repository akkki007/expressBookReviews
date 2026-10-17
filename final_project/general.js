const axios = require('axios');

const BASE_URL = "http://localhost:5000";

// Task 10: Get all books – Using async callback function
function getAllBooks(callback) {
  axios.get(`${BASE_URL}/`)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((error) => {
      callback(error, null);
    });
}

// Task 11: Search by ISBN – Using Promises
function getBookByISBN(isbn) {
  return axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then((response) => {
      console.log(`Book details for ISBN ${isbn}:`, response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(`Error fetching book with ISBN ${isbn}:`, error.message);
      throw error;
    });
}

// Task 12: Search by Author – Using async/await
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`);
    console.log(`Books by ${author}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books by author ${author}:`, error.message);
    throw error;
  }
}

// Task 13: Search by Title – Using async/await
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`);
    console.log(`Books with title "${title}":`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books with title "${title}":`, error.message);
    throw error;
  }
}

module.exports = { getAllBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle };

// Demo run: node general.js (requires the server from index.js to be running)
if (require.main === module) {
  getAllBooks((err, data) => {
    if (err) {
      return console.error("Error fetching all books:", err.message);
    }
    console.log("All books:", data);
  });

  getBookByISBN(1);
  getBooksByAuthor("Jane Austen");
  getBooksByTitle("Fairy tales");
}
