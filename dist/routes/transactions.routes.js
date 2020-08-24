"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _CreateTransactionService = _interopRequireDefault(require("../services/CreateTransactionService"));

var _ListTransactionService = _interopRequireDefault(require("../services/ListTransactionService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
const transactionsRouter = (0, _express.Router)();
transactionsRouter.post('/', async (request, response) => {
  try {
    const {
      wallet_id
    } = request.headers;
    const {
      date,
      category_id,
      type,
      value,
      description
    } = request.body;
    const createTransaction = new _CreateTransactionService.default();
    const transaction = await createTransaction.execute({
      date,
      category_id,
      type,
      value,
      description,
      wallet_id
    });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({
      error: err.message
    });
  }
});
transactionsRouter.get('/', async (request, response) => {
  try {
    const {
      wallet_id
    } = request.headers;
    const listTransaction = new _ListTransactionService.default();
    const transaction = await listTransaction.execute({
      wallet_id
    });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({
      error: err.message
    });
  }
});
var _default = transactionsRouter;
exports.default = _default;