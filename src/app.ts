import express, { Request, Response, Router } from 'express';
import ProductController from './controllers/product.controller';

const app = express();
const router = Router();
app.use(router);

app.use(express.json());
//
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Express and TypeScript');
});

const productController = new ProductController();

app.get('/products', productController.getAll);
app.post('/products', productController.create);

//
export default app;
