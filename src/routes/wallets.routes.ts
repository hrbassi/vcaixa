/* eslint-disable camelcase */
import { Router } from 'express';
import CreateWalletService from '../services/CreateWalletService';
import ListWalletService from '../services/ListWalletService';

const walletsRouter = Router();

walletsRouter.post('/', async (request, response) => {
    try {
        const { balance } = request.body;
        const createWallet = new CreateWalletService();

        const wallet = await createWallet.execute({
            balance,
        });
        return response.json(wallet);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

walletsRouter.get('/', async (request, response) => {
    try {
        const { wallet_id } = request.headers;
        const { initial_date, final_date } = request.body;

        const listWallet = new ListWalletService();

        const wallet = await listWallet.execute({
            wallet_id,
            initial_date,
            final_date,
        });
        return response.json(wallet);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default walletsRouter;
