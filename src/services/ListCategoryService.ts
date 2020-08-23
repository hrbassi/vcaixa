/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import Category from '../models/Category';
import CategoriesRepository from '../repositories/CategoriesRepository';
import WalletsRepository from '../repositories/WalletsRepository';

interface Request {
    wallet_id: string | string[] | undefined;
}

class ListCategoryService {
    public async execute({ wallet_id }: Request): Promise<Category[]> {
        const categoriesRepository = getCustomRepository(CategoriesRepository);
        const walletsRepository = getCustomRepository(WalletsRepository);

        const existsWallet = await walletsRepository.findOne({
            where: { id: wallet_id },
        });
        if (!existsWallet) {
            throw new Error('Carteira inexistente para listagem de categorias');
        }

        return categoriesRepository.find({ where: { wallet_id } });
    }
}

export default ListCategoryService;
