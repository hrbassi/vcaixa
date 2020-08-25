/* eslint-disable camelcase */
import { EntityRepository, Repository } from 'typeorm';
import Category from '../models/Category';

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category> {
    public async findByWalletId(wallet_id: string): Promise<Category[]> {
        const findCategories = await this.find({
            where: {
                wallet_id,
            },
        });

        return findCategories;
    }

    public async findByWalletIdAndCategoryName(
        wallet_id: string,
        name: string,
    ): Promise<Category[]> {
        const findCategories = await this.find({
            where: {
                wallet_id,
                name,
            },
        });

        return findCategories;
    }

    public async createCategory(
        wallet_id: string,
        name: string,
    ): Promise<Category | null> {
        const category = this.create({
            name,
            wallet_id,
        });
        await this.save(category);

        return category || null;
    }
}

export default CategoriesRepository;
