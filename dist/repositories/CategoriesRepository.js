"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Category = _interopRequireDefault(require("../models/Category"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CategoriesRepository = (_dec = (0, _typeorm.EntityRepository)(_Category.default), _dec(_class = class CategoriesRepository extends _typeorm.Repository {}) || _class);
var _default = CategoriesRepository;
exports.default = _default;