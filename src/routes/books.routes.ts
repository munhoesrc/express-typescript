import { Router } from 'express';
import BooksController from '../controllers/book.controller';
import {
  validateBook,
  validatePartialBook,
} from '../middlewares/books.middleware';


const router = Router();
const booksController = new BooksController();

router
  .route('/books')
  .get(booksController.getAll)
  .post(booksController.create);

router
  .route('/books/:id')
  .get(booksController.getById)
  .put(validateBook, booksController.update)
  .delete(booksController.remove)
  .patch(validatePartialBook, booksController.partialUpdate);

export default router;