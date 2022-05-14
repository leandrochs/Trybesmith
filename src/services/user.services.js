"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../models/connection"));
var user_model_1 = __importDefault(require("../models/user.model"));
var UserService = /** @class */ (function () {
    function UserService() {
        this.model = new user_model_1.default(connection_1.default);
    }
    UserService.prototype.create = function (user) {
        return this.model.create(user);
    };
    return UserService;
}());
exports.default = UserService;
