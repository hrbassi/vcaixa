/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import WalletsRepository from '../repositories/WalletsRepository';
import CategoriesRepository from '../repositories/CategoriesRepository';
import Consts from '../settings/consts';
import RoundFloatPrecision3 from '../utils/RoundFloatPrecision';

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

        const existsWallet = await walletsRepository.findOne({
            where: { id: walletId },
        });
        if (!existsWallet) {
            throw new Error(
                'Carteira inexistente para lançamento de movimentações',
            );
        }

        const existsCategory = await categoriesRepository.findOne({
            where: { id: category_id },
        });
        if (!existsCategory) {
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

        const transaction = transactionsRepository.create({
            date,
            category_id,
            type,
            value: RoundFloatPrecision3(value),
            description,
            wallet_id: walletId,
        });
        await transactionsRepository.save(transaction);

        return transaction;
    }
}

export default CreateTransactionService;
