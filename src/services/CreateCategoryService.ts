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

        const existsWallet = await walletsRepository.findOne({
            where: { id: walletId },
        });
        if (!existsWallet) {
            throw new Error('Carteira inexistente para criação de categorias');
        }

        const checkCategoryExists = await categoriesRepository.findOne({
            where: { name },
        });
        if (checkCategoryExists) {
            throw new Error('Categoria já cadastrada');
        }

        const category = categoriesRepository.create({
            name,
            wallet_id: walletId,
        });
        await categoriesRepository.save(category);

        return category;
    }
}

export default CreateCategoryService;
