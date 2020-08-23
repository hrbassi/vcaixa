/* eslint-disable camelcase */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import Category from './Category';
import Wallet from './Wallet';

@Entity('transactions')
class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('timestamp with time zone')
    date: Date;

    @Column({ select: false })
    category_id: string;

    @OneToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @Column()
    type: string;

    @Column('float')
    value: number;

    @Column()
    description: string;

    @Column({ select: false })
    wallet_id: string;

    @ManyToOne(() => Wallet, wallet => wallet.transactions)
    @JoinColumn({ name: 'wallet_id' })
    wallet: Wallet;
}

export default Transaction;
