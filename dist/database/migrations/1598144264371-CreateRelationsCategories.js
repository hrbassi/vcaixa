"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateRelationsCategories1598144264371 {
  async up(queryRunner) {
    await queryRunner.createForeignKey('categories', new _typeorm.TableForeignKey({
      name: 'category_wallet',
      columnNames: ['wallet_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'wallets',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('categories', 'category_wallet');
  }

}

exports.default = CreateRelationsCategories1598144264371;