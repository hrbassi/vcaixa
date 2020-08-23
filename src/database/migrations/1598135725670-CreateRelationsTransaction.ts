import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateRelationsTransaction1598135725670
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKeys('transactions', [
            new TableForeignKey({
                name: 'transaction_wallet',
                columnNames: ['wallet_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'wallets',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
            new TableForeignKey({
                name: 'transaction_category',
                columnNames: ['category_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'categories',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('transactions', 'transaction_wallet');
        await queryRunner.dropForeignKey(
            'transactions',
            'transaction_category',
        );
    }
}
