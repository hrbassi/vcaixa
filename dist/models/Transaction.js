"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable camelcase */
var typeorm_1 = require("typeorm");
var Category_1 = __importDefault(require("./Category"));
var Wallet_1 = __importDefault(require("./Wallet"));
var Transaction = /** @class */ (function () {
    function Transaction() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Transaction.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column('timestamp with time zone'),
        __metadata("design:type", Date)
    ], Transaction.prototype, "date", void 0);
    __decorate([
        typeorm_1.Column({ select: false }),
        __metadata("design:type", String)
    ], Transaction.prototype, "category_id", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return Category_1.default; }),
        typeorm_1.JoinColumn({ name: 'category_id' }),
        __metadata("design:type", Category_1.default)
    ], Transaction.prototype, "category", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Transaction.prototype, "type", void 0);
    __decorate([
        typeorm_1.Column('float'),
        __metadata("design:type", Number)
    ], Transaction.prototype, "value", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Transaction.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({ select: false }),
        __metadata("design:type", String)
    ], Transaction.prototype, "wallet_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Wallet_1.default; }, function (wallet) { return wallet.transactions; }),
        typeorm_1.JoinColumn({ name: 'wallet_id' }),
        __metadata("design:type", Wallet_1.default)
    ], Transaction.prototype, "wallet", void 0);
    Transaction = __decorate([
        typeorm_1.Entity('transactions')
    ], Transaction);
    return Transaction;
}());
exports.default = Transaction;
