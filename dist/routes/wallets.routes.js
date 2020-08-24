"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _CreateWalletService = _interopRequireDefault(require("../services/CreateWalletService"));

var _ListWalletService = _interopRequireDefault(require("../services/ListWalletService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
const walletsRouter = (0, _express.Router)();
walletsRouter.post('/', async (request, response) => {
  try {
    const {
      balance
    } = request.body;
    const createWallet = new _CreateWalletService.default();
    const wallet = await createWallet.execute({
      balance
    });
    return response.json(wallet);
  } catch (err) {
    return response.status(400).json({
      error: err.message
    });
  }
});
walletsRouter.get('/', async (request, response) => {
  try {
    const {
      wallet_id
    } = request.headers;
    const {
      initial_date,
      final_date
    } = request.body;
    const listWallet = new _ListWalletService.default();
    const wallet = await listWallet.execute({
      wallet_id,
      initial_date,
      final_date
    });
    return response.json(wallet);
  } catch (err) {
    return response.status(400).json({
      error: err.message
    });
  }
});
var _default = walletsRouter;
exports.default = _default;