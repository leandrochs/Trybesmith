"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
var product_controller_1 = __importDefault(require("./controllers/product.controller"));
var user_controller_1 = __importDefault(require("./controllers/user.controller"));
var products_middleware_1 = __importDefault(require("./middlewares/products.middleware"));
var users_middleware_1 = __importDefault(require("./middlewares/users.middleware"));
var app = (0, express_1.default)();
var router = (0, express_1.Router)();
app.use(router);
app.use(express_1.default.json());
//
app.get('/', function (req, res) {
    res.status(200).send('Express and TypeScript');
});
var productController = new product_controller_1.default();
var userController = new user_controller_1.default();
app.get('/products', productController.getAll);
app.post('/products', products_middleware_1.default, productController.create);
app.post('/users', users_middleware_1.default, userController.create);
//
exports.default = app;
