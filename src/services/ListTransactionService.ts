/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import WalletsRepository from '../repositories/WalletsRepository';

interface Request {
    wallet_id: string | string[] | undefined;
}

class ListTransactionService {
    public async execute({ wallet_id }: Request): Promise<Transaction[]> {
        const transactionsRepository = getCustomRepository(
            TransactionsRepository,
        );
        const walletsRepository = getCustomRepository(WalletsRepository);

        const existsWallet = await walletsRepository.findOne({
            where: { id: wallet_id },
        });
        if (!existsWallet) {
            throw new Error('Carteira inexistente para listagem de categorias');
        }

        return transactionsRepository.find({
            where: { wallet_id },
            // select: ['value'],
            relations: ['category'],
        });
    }
}

export default ListTransactionService;
