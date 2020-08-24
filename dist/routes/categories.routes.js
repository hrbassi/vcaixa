"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _CreateCategoryService = _interopRequireDefault(require("../services/CreateCategoryService"));

var _ListCategoryService = _interopRequireDefault(require("../services/ListCategoryService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
const categoriesRouter = (0, _express.Router)();
categoriesRouter.post('/', async (request, response) => {
  try {
    const {
      wallet_id
    } = request.headers;
    const {
      name
    } = request.body;
    const createCategory = new _CreateCategoryService.default();
    const category = await createCategory.execute({
      name,
      wallet_id
    });
    return response.json(category);
  } catch (err) {
    return response.status(400).json({
      error: err.message
    });
  }
});
categoriesRouter.get('/', async (request, response) => {
  try {
    const {
      wallet_id
    } = request.headers;
    const listCategory = new _ListCategoryService.default();
    const category = await listCategory.execute({
      wallet_id
    });
    return response.json(category);
  } catch (err) {
    return response.status(400).json({
      error: err.message
    });
  }
});
var _default = categoriesRouter;
exports.default = _default;