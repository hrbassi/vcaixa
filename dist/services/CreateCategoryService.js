"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _CategoriesRepository = _interopRequireDefault(require("../repositories/CategoriesRepository"));

var _WalletsRepository = _interopRequireDefault(require("../repositories/WalletsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
class CreateCategoryService {
  async execute({
    name,
    wallet_id
  }) {
    const categoriesRepository = (0, _typeorm.getCustomRepository)(_CategoriesRepository.default);
    const walletsRepository = (0, _typeorm.getCustomRepository)(_WalletsRepository.default);
    const walletId = String(wallet_id);
    const existsWallet = await walletsRepository.findOne({
      where: {
        id: walletId
      }
    });

    if (!existsWallet) {
      throw new Error('Carteira inexistente para criação de categorias');
    }

    const checkCategoryExists = await categoriesRepository.findOne({
      where: {
        name
      }
    });

    if (checkCategoryExists) {
      throw new Error('Categoria já cadastrada');
    }

    const category = categoriesRepository.create({
      name,
      wallet_id: walletId
    });
    await categoriesRepository.save(category);
    return category;
  }

}

var _default = CreateCategoryService;
exports.default = _default;