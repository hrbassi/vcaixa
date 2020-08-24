"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _TransactionsRepository = _interopRequireDefault(require("../repositories/TransactionsRepository"));

var _WalletsRepository = _interopRequireDefault(require("../repositories/WalletsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
class ListTransactionService {
  async execute({
    wallet_id
  }) {
    const transactionsRepository = (0, _typeorm.getCustomRepository)(_TransactionsRepository.default);
    const walletsRepository = (0, _typeorm.getCustomRepository)(_WalletsRepository.default);
    const existsWallet = await walletsRepository.findOne({
      where: {
        id: wallet_id
      }
    });

    if (!existsWallet) {
      throw new Error('Carteira inexistente para listagem de categorias');
    }

    return transactionsRepository.find({
      where: {
        wallet_id
      },
      // select: ['value'],
      relations: ['category']
    });
  }

}

var _default = ListTransactionService;
exports.default = _default;