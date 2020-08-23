import { Router } from 'express';
import transactionsRouter from './transactions.routes';
import categoriesRouter from './categories.routes';
import walletsRouter from './wallets.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/wallets', walletsRouter);

export default routes;
