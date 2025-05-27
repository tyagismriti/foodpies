const fs = require("fs");
const BookModel = require("../models/bookmodel");

const getBooks = async (req, res) => {
  try {
    const books = await BookModel.find().lean();
    return res.status(200).json(books);
  } catch (error) {
    console.error(error);
    return res.status(500).send({status: "error", message:error.message});
  }
};

const postBook = async (req, res) => {
  try {
    const { url, title, price, link } = req.body;
    const numberedPrice = Number(price.replace("$", ""));
    const book = await BookModel.create({ url, title, price: numberedPrice, link });
    return res.status(201).json(book);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

const postBooksFromFile = async (req, res) => {
  try {
    fs.readFile(__dirname + "./../" + "book_list.json", "utf-8", async (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Unable to read book list");
      }
      const books = JSON.parse(data);

      const booksData = books.map((book) => {
        const { id, ...bookData } = book;
        const price = Number(book.price.replace("$", ""));
        return { ...bookData, price };
      });

      const addedBooks = await BookModel.insertMany(booksData);

      return res.status(201).json({ message: `${addedBooks.length} books added successfully!` });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = { getBooks, postBook, postBooksFromFile };
