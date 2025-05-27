const express = require("express");
const router = express.Router();

const { getBooks, postBook, postBooksFromFile } = require("../controllers/bookController");

router.get("/", getBooks);
router.post("/addBook", postBook);
router.post("/addBooksFromFile", postBooksFromFile);

module.exports = router;
