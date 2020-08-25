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

        const walletId = String(wallet_id);

        const findWallet = await walletsRepository.findOneById(walletId);

        if (!findWallet) {
            throw new Error(
                'Carteira inexistente para listagem de movimentações',
            );
        }

        return transactionsRepository.findByWalletId(walletId);
    }
}

export default ListTransactionService;
