const mongoose = require("mongoose");


const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book"
    }
  ]
})

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  publishedDate: {
    type: String,
  },
  genres: {
    type: [String]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, // _id:
    ref: "Author"
  }
});

let Book = mongoose.model("Book", bookSchema);
let Author = mongoose.model("Author", authorSchema);

module.exports = { Book, Author }; 