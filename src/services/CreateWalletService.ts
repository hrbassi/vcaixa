import { getCustomRepository } from 'typeorm';
import Wallet from '../models/Wallet';
import WalletsRepository from '../repositories/WalletsRepository';

class CreateWalletService {
    public async execute(): Promise<Wallet> {
        const walletsRepository = getCustomRepository(WalletsRepository);

        const createdWallet = await walletsRepository.createWallet();

        if (!createdWallet) {
            throw new Error('Erro na criação da carteira');
        }
        const wallet = createdWallet;

        return wallet;
    }
}

export default CreateWalletService;
