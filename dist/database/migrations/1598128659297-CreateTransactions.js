"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateTransactions1598128659297 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'transactions',
      columns: [{
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'date',
        type: 'timestamp with time zone',
        isNullable: false
      }, {
        name: 'category_id',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'type',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'value',
        type: 'float',
        isNullable: false
      }, {
        name: 'description',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'wallet_id',
        type: 'varchar',
        isNullable: false
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('transactions');
  }

}

exports.default = CreateTransactions1598128659297;