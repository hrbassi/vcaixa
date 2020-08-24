"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function RoundFloatPrecision3(floatValue) {
  return Number(floatValue.toPrecision(3));
}

var _default = RoundFloatPrecision3;
exports.default = _default;