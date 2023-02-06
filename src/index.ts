import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import BooksRoutes from './routes/books.routes';
import statusCodes from './statusCodes';

const app = express();

app.use(express.json());

const PORT = 8000;

app.use(BooksRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(statusCodes.OK).send('Express + TypeScript');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as any;
  console.log(`name: ${name}`);

  switch (name) {
    case 'ValidationError':
      res.status(statusCodes.BAD_REQUEST).json({ message: details[0].message });
      break;
    case 'NotFoundError':
      res.status(statusCodes.NOT_FOUND).json({ message });
      break;
    case 'ConflictError':
      res.status(statusCodes.CONFLICT).json({ message });
      break;
    default:
      console.error(err);
      res.sendStatus(statusCodes.INTERNAL_SERVER_ERROR);
  }

  next();
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});