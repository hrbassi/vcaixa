"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _WalletsRepository = _interopRequireDefault(require("../repositories/WalletsRepository"));

var _TransactionsRepository = _interopRequireDefault(require("../repositories/TransactionsRepository"));

var _consts = _interopRequireDefault(require("../settings/consts"));

var _RoundFloatPrecision = _interopRequireDefault(require("../utils/RoundFloatPrecision"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
const consts = new _consts.default();

class ListWalletService {
  async execute({
    wallet_id,
    initial_date,
    final_date
  }) {
    const walletsRepository = (0, _typeorm.getCustomRepository)(_WalletsRepository.default);
    const transactionsRepository = (0, _typeorm.getCustomRepository)(_TransactionsRepository.default);
    const wallet = await walletsRepository.findOne({
      where: {
        id: wallet_id
      },
      relations: ['transactions', 'transactions.category']
    });

    if (!wallet) {
      throw new Error('Carteira inexistente para listagem de categorias');
    }

    const transactions = await transactionsRepository.find({
      where: {
        wallet_id,
        date: (0, _typeorm.Between)(initial_date, final_date)
      }
    });
    const transactionEntries = transactions.reduce(function getEntries(entries, entry) {
      if (entry.type === consts.TYPE_ENTRY) {
        return entries + entry.value;
      }

      return entries + 0;
    }, 0);
    const transactionOutputs = transactions.reduce(function getOutputs(entries, entry) {
      if (entry.type === consts.TYPE_OUTPUT) {
        return entries + entry.value;
      }

      return entries + 0;
    }, 0);

    if (wallet !== undefined && wallet) {
      wallet.balance = (0, _RoundFloatPrecision.default)(transactionEntries - transactionOutputs);
      wallet.transactions = transactions;
    }

    return wallet;
  }

}

var _default = ListWalletService;
exports.default = _default;