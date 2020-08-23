import { getCustomRepository } from 'typeorm';
import Wallet from '../models/Wallet';
import WalletsRepository from '../repositories/WalletsRepository';

interface Request {
    balance: number;
}

class CreateWalletService {
    public async execute({ balance }: Request): Promise<Wallet> {
        const walletsRepository = getCustomRepository(WalletsRepository);

        if (balance === Number(0) || balance === undefined) {
            const wallet = walletsRepository.create({
                balance: 0,
            });
            await walletsRepository.save(wallet);
            return wallet;
        }
        throw new Error('Balanço inicial sempre deve ser zero');
    }
}

export default CreateWalletService;
