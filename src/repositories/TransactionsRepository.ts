/* eslint-disable camelcase */
import { EntityRepository, Repository, Between } from 'typeorm';
import Transaction from '../models/Transaction';

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
    public async findByWalletIdAndDates(
        wallet_id: string,
        initial_date: Date,
        final_date: Date,
    ): Promise<Transaction[]> {
        const findTransactions = await this.find({
            where: {
                wallet_id,
                date: Between(initial_date, final_date),
            },
            relations: ['category'],
        });

        return findTransactions;
    }

    public async findByWalletId(wallet_id: string): Promise<Transaction[]> {
        const findTransactions = await this.find({
            where: {
                wallet_id,
            },
            relations: ['category'],
        });

        return findTransactions;
    }

    public async createTransaction(
        date: Date,
        category_id: string,
        type: string,
        value: number,
        description: string,
        wallet_id: string,
    ): Promise<Transaction | null> {
        const transaction = this.create({
            date,
            category_id,
            type,
            value,
            description,
            wallet_id,
        });
        await this.save(transaction);

        return transaction || null;
    }
}

export default TransactionsRepository;
