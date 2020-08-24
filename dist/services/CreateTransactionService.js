"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _TransactionsRepository = _interopRequireDefault(require("../repositories/TransactionsRepository"));

var _WalletsRepository = _interopRequireDefault(require("../repositories/WalletsRepository"));

var _CategoriesRepository = _interopRequireDefault(require("../repositories/CategoriesRepository"));

var _consts = _interopRequireDefault(require("../settings/consts"));

var _RoundFloatPrecision = _interopRequireDefault(require("../utils/RoundFloatPrecision"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
const consts = new _consts.default();

class CreateTransactionService {
  async execute({
    date,
    category_id,
    type,
    value,
    description,
    wallet_id
  }) {
    const transactionsRepository = (0, _typeorm.getCustomRepository)(_TransactionsRepository.default);
    const walletsRepository = (0, _typeorm.getCustomRepository)(_WalletsRepository.default);
    const categoriesRepository = (0, _typeorm.getCustomRepository)(_CategoriesRepository.default);
    const walletId = String(wallet_id);
    const existsWallet = await walletsRepository.findOne({
      where: {
        id: walletId
      }
    });

    if (!existsWallet) {
      throw new Error('Carteira inexistente para lançamento de movimentações');
    }

    const existsCategory = await categoriesRepository.findOne({
      where: {
        id: category_id
      }
    });

    if (!existsCategory) {
      throw new Error(`Categoria inexistente para lançamento de movimentações`);
    }

    if (value < 0) {
      throw new Error('O valor da movimentação não pode ser negativo');
    }

    if (type !== consts.TYPE_ENTRY && type !== consts.TYPE_OUTPUT) {
      throw new Error(`O tipo da movimentação deve ser '${consts.TYPE_ENTRY}' para Entrada ou '${consts.TYPE_OUTPUT}' para Saída`);
    }

    const transaction = transactionsRepository.create({
      date,
      category_id,
      type,
      value: (0, _RoundFloatPrecision.default)(value),
      description,
      wallet_id: walletId
    });
    await transactionsRepository.save(transaction);
    return transaction;
  }

}

var _default = CreateTransactionService;
exports.default = _default;