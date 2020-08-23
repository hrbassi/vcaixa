import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterWalletDropBalance1598190400308
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('wallets', 'balance');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'wallets',
            new TableColumn({
                name: 'balance',
                type: 'varchar',
                default: 0,
                isNullable: false,
            }),
        );
    }
}
