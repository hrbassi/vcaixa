"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateRelationsTransaction1598135725670 {
  async up(queryRunner) {
    await queryRunner.createForeignKeys('transactions', [new _typeorm.TableForeignKey({
      name: 'transaction_wallet',
      columnNames: ['wallet_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'wallets',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }), new _typeorm.TableForeignKey({
      name: 'transaction_category',
      columnNames: ['category_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'categories',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })]);
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('transactions', 'transaction_wallet');
    await queryRunner.dropForeignKey('transactions', 'transaction_category');
  }

}

exports.default = CreateRelationsTransaction1598135725670;