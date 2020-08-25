/* eslint-disable camelcase */
import { Router } from 'express';
import CreateCategoryService from '../services/CreateCategoryService';
import ListCategoryService from '../services/ListCategoryService';

const categoriesRouter = Router();

categoriesRouter.post('/', async (request, response) => {
    try {
        const { wallet_id } = request.headers;
        const { name } = request.body;
        const createCategory = new CreateCategoryService();

        const category = await createCategory.execute({
            wallet_id,
            name,
        });
        return response.json(category);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

categoriesRouter.get('/', async (request, response) => {
    try {
        const { wallet_id } = request.headers;

        const listCategory = new ListCategoryService();

        const category = await listCategory.execute({
            wallet_id,
        });
        return response.json(category);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default categoriesRouter;
