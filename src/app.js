"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var product_controller_1 = __importDefault(require("./controllers/product.controller"));
var app = (0, express_1.default)();
// const router = Router();
// app.use(router);
app.use(express_1.default.json());
//
app.get('/', function (req, res) {
    res.status(200).send('Express and TypeScript');
});
var productController = new product_controller_1.default();
app.get('/products', productController.getAll);
//
exports.default = app;
