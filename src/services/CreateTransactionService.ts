/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import WalletsRepository from '../repositories/WalletsRepository';
import CategoriesRepository from '../repositories/CategoriesRepository';
import Consts from '../settings/consts';
import RoundFloatPrecision3 from '../utils/RoundFloatPrecision';
import RoundFloatToFixed2 from '../utils/RoundFloatTofixed2';

const consts = new Consts();

interface Request {
    date: Date;
    category_id: string;
    type: string;
    value: number;
    description: string;
    wallet_id: string | string[] | undefined;
}

class CreateTransactionService {
    public async execute({
        date,
        category_id,
        type,
        value,
        description,
        wallet_id,
    }: Request): Promise<Transaction> {
        const transactionsRepository = getCustomRepository(
            TransactionsRepository,
        );
        const walletsRepository = getCustomRepository(WalletsRepository);
        const categoriesRepository = getCustomRepository(CategoriesRepository);

        const walletId = String(wallet_id);

        const findWallet = await walletsRepository.findOneById(walletId);

        if (!findWallet) {
            throw new Error(
                'Carteira inexistente para lançamento de movimentações',
            );
        }
        const existsCategory = await categoriesRepository.findByWalletId(
            walletId,
        );

        if (!existsCategory) {
            throw new Error(
                `Categoria inexistente para lançamento de movimentações`,
            );
        }

        const foundCategory = existsCategory.find(
            category => category.id === category_id,
        );

        if (!foundCategory) {
            throw new Error(
                `Categoria inexistente para lançamento de movimentações`,
            );
        }

        if (value < 0) {
            throw new Error('O valor da movimentação não pode ser negativo');
        }
        if (type !== consts.TYPE_ENTRY && type !== consts.TYPE_OUTPUT) {
            throw new Error(
                `O tipo da movimentação deve ser '${consts.TYPE_ENTRY}' para Entrada ou '${consts.TYPE_OUTPUT}' para Saída`,
            );
        }

        const createdTransaction = await transactionsRepository.createTransaction(
            date,
            category_id,
            type,
            RoundFloatToFixed2(value),
            description,
            walletId,
        );

        if (!createdTransaction) {
            throw new Error('Erro na criação da movimentação');
        }

        const transaction = createdTransaction;

        return transaction;
    }
}

export default CreateTransactionService;
