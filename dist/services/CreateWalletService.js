"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _WalletsRepository = _interopRequireDefault(require("../repositories/WalletsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateWalletService {
  async execute({
    balance
  }) {
    const walletsRepository = (0, _typeorm.getCustomRepository)(_WalletsRepository.default);

    if (balance === Number(0) || balance === undefined) {
      const wallet = walletsRepository.create({
        balance: 0
      });
      await walletsRepository.save(wallet);
      return wallet;
    }

    throw new Error('Balanço inicial sempre deve ser zero');
  }

}

var _default = CreateWalletService;
exports.default = _default;