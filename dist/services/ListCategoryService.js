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
class ListCategoryService {
  async execute({
    wallet_id
  }) {
    const categoriesRepository = (0, _typeorm.getCustomRepository)(_CategoriesRepository.default);
    const walletsRepository = (0, _typeorm.getCustomRepository)(_WalletsRepository.default);
    const existsWallet = await walletsRepository.findOne({
      where: {
        id: wallet_id
      }
    });

    if (!existsWallet) {
      throw new Error('Carteira inexistente para listagem de categorias');
    }

    return categoriesRepository.find({
      where: {
        wallet_id
      }
    });
  }

}

var _default = ListCategoryService;
exports.default = _default;