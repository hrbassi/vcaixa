import { EntityRepository, Repository } from 'typeorm';
import Wallet from '../models/Wallet';

@EntityRepository(Wallet)
class WalletsRepository extends Repository<Wallet> {}

export default WalletsRepository;
