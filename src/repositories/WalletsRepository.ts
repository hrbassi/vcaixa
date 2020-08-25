/* eslint-disable camelcase */
import { EntityRepository, Repository } from 'typeorm';
import Wallet from '../models/Wallet';

@EntityRepository(Wallet)
class WalletsRepository extends Repository<Wallet> {
    public async findOneById(wallet_id: string): Promise<Wallet | null> {
        const findWallet = await this.findOne({
            where: { id: wallet_id },
            relations: ['transactions', 'transactions.category'],
        });
        return findWallet || null;
    }

    public async createWallet(): Promise<Wallet | null> {
        const wallet = this.create({
            balance: 0,
        });
        await this.save(wallet);

        return wallet || null;
    }
}

export default WalletsRepository;
