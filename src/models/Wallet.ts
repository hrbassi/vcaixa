import { Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Transaction from './Transaction';

@Entity('wallets')
class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    balance: number;

    @OneToMany(() => Transaction, transaction => transaction.wallet)
    @JoinColumn({ name: 'id' })
    transactions: Transaction[];
}
export default Wallet;
