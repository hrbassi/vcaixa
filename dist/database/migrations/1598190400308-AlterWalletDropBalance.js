"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AlterWalletDropBalance1598190400308 {
  async up(queryRunner) {
    await queryRunner.dropColumn('wallets', 'balance');
  }

  async down(queryRunner) {
    await queryRunner.addColumn('wallets', new _typeorm.TableColumn({
      name: 'balance',
      type: 'varchar',
      default: 0,
      isNullable: false
    }));
  }

}

exports.default = AlterWalletDropBalance1598190400308;