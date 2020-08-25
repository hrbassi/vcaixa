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
        const walletId = String(wallet_id);

        const findWallet = await walletsRepository.findOneById(walletId);

        if (!findWallet) {
            throw new Error('Carteira inexistente para listagem de categorias');
        }

        return categoriesRepository.findByWalletId(walletId);
    }
}

export default ListCategoryService;
