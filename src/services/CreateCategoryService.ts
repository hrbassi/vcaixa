/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import Category from '../models/Category';
import CategoriesRepository from '../repositories/CategoriesRepository';
import WalletsRepository from '../repositories/WalletsRepository';

interface Request {
    name: string;
    wallet_id: string | string[] | undefined;
}

class CreateCategoryService {
    public async execute({ name, wallet_id }: Request): Promise<Category> {
        const categoriesRepository = getCustomRepository(CategoriesRepository);
        const walletsRepository = getCustomRepository(WalletsRepository);

        const walletId = String(wallet_id);

        const findWallet = await walletsRepository.findOneById(walletId);

        if (!findWallet) {
            throw new Error('Carteira inexistente para criação de categorias');
        }

        const checkCategoryExists = await categoriesRepository.findByWalletIdAndCategoryName(
            walletId,
            name,
        );

        if (checkCategoryExists.length > 0) {
            throw new Error('Categoria já cadastrada');
        }

        const createdCategory = await categoriesRepository.createCategory(
            walletId,
            name,
        );

        if (!createdCategory) {
            throw new Error('Erro na criação da categoria');
        }
        const category = createdCategory;

        return category;
    }
}

export default CreateCategoryService;
