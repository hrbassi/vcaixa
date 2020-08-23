import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateRelationsCategories1598144264371
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'categories',
            new TableForeignKey({
                name: 'category_wallet',
                columnNames: ['wallet_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'wallets',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('categories', 'category_wallet');
    }
}
