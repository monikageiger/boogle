//1 import packages and User model
const User = require("../models/User.model");
const CreatedBook = require("../models/CreatedBook.model");
const router = require("express").Router();
const fileUploader = require("../config/cloudinary");

const isLoggedIn = require("../middleware/isLoggedIn");

//CREATE NEW BOOK
router.get("/new-book", isLoggedIn, (req, res) => {
  CreatedBook.find()
    .then((books) => {
      res.render("pages/user-books/new-book", {
        books: books,
      });
    })
    .catch((err) => console.log(err));
});

router.post("/new-book", fileUploader.single("bookPictureUrl"), (req, res) => {
  const { title, authors, publishedDate, description, pageCount, categories } =
    req.body;
  const bookPictureUrl = req.file.path;
  const user = req.session.currentUser;
  console.log(user);

  CreatedBook.create({
    title,
    authors,
    publishedDate,
    description,
    pageCount,
    categories,
    bookPictureUrl,
    user,
  })
    .then((newBook) => {
      User.findByIdAndUpdate(user._id, {
        $push: {
          createdBooks: newBook,
        },
      })
        .then((updatedUser) => {
          res.redirect("/bookshelf/my-created-books");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/new-book");
    });
});

//DELETE BOOKS
router.get("/:id/delete", (req, res) => {
  const id = req.params.id;
  CreatedBook.findByIdAndDelete(id)
    .then((deletedBook) => {
      res.redirect("/bookshelf/my-created-books");
    })
    .catch((err) => console.log(err));
});

//EDIT BOOKS
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;

  CreatedBook.findById(id)
    .then((book) => {
      console.log(book);
      res.render("pages/user-books/edit-book", {
        book,
      });
    })
    .catch((err) => console.log(err));
});

router.post("/:id/edit", (req, res) => {
  const id = req.params.id;
  const { title, authors, publishedDate, description, pageCount, categories } =
    req.body;
  // const bookPictureUrl = req.file.path;

  CreatedBook.findByIdAndUpdate(id, {
    title,
    authors,
    publishedDate,
    description,
    pageCount,
    categories,
  })
    .then(() => {
      res.redirect(`/books/${id}`);
    })
    .catch((err) => console.log(err));
});

//BOOK DETAILS
router.get("/:id", (req, res) => {
  const id = req.params.id;
  CreatedBook.findById(id)
    .then((book) => {
      res.render("pages/user-books/book-details", {
        book: book,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
