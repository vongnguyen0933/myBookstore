const { Author, Book } = require("../model/model");

const bookController = {

  // ADD BOOK
  addBook: async (req, res) => {
    try {
      const newBook = new Book(req.body);
      const savedBook = await newBook.save();
      if (req.body.author) {
        const author = Author.findById(req.body.author);
        await author.updateOne({ $push: { books: savedBook._id } });
      }
      res.status(200).json(savedBook);
    } catch (error) {
      res.status(500).json(error)
    };
  },

  // GET ALL BOOK
  getAllBooks: async (req, res) => {
    try {
      const allBooks = await Book.find();
      res.status(200).json(allBooks)
    } catch (err) {
      res.status(500).json(200)
    }
  },

  //GET A BOOK
  getABook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).populate("author");
      res.status(200).json(book);

    } catch (err) {
      res.status(500).json(err)
    }
  },

  //UPDATE BOOK
  updateBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      await book.updateOne({ $set: req.body });
      res.status(200).json('Update Successfully!');
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE BOOK

  deleteBook: async (req, res) => {
    try {
      await Author.updateMany(
        { books: req.params.id },
        { $pull: { books: req.params.id } });
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Successfully");
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = bookController;