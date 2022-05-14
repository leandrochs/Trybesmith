import express, { Request, Response, Router } from 'express';
import ProductController from './controllers/product.controller';
import UserController from './controllers/user.controller';
import validationProduct from './middlewares/products.middleware';
import validationUser from './middlewares/users.middleware';

const app = express();
const router = Router();
app.use(router);

app.use(express.json());
//
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Express and TypeScript');
});

const productController = new ProductController();
const userController = new UserController();

app.get('/products', productController.getAll);
app.post('/products', validationProduct, productController.create);
app.post('/users', validationUser, userController.create);

//
export default app;
