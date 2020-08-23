/* eslint-disable camelcase */
import { Router } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';
import ListTransactionService from '../services/ListTransactionService';

const transactionsRouter = Router();

transactionsRouter.post('/', async (request, response) => {
    try {
        const { wallet_id } = request.headers;
        const { date, category_id, type, value, description } = request.body;
        const createTransaction = new CreateTransactionService();

        const transaction = await createTransaction.execute({
            date,
            category_id,
            type,
            value,
            description,
            wallet_id,
        });

        return response.json(transaction);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

transactionsRouter.get('/', async (request, response) => {
    try {
        const { wallet_id } = request.headers;

        const listTransaction = new ListTransactionService();

        const transaction = await listTransaction.execute({
            wallet_id,
        });

        return response.json(transaction);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default transactionsRouter;
