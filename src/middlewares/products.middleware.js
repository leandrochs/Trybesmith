"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var properties = ['name', 'amount'];
// id?: number;
// name: string;
// amount: string;
// orderId?: number;
function validateProperties(product) {
    for (var i = 0; i < properties.length; i += 1) {
        if (!Object.prototype.hasOwnProperty.call(product, properties[i])) {
            return [false, properties[i]];
        }
    }
    return [true, null];
}
function validateValueType(product) {
    var entries = Object.entries(product);
    for (var i = 0; i < entries.length; i += 1) {
        var _a = entries[i], property = _a[0], value = _a[1];
        if (typeof value !== 'string') {
            return [false, property];
        }
    }
    return [true, null];
}
function validateValues(product) {
    var entries = Object.entries(product);
    for (var i = 0; i < entries.length; i += 1) {
        var _a = entries[i], property = _a[0], value = _a[1];
        if (value.length < 3) {
            return [false, property];
        }
    }
    return [true, null];
}
function validationBook(req, res, next) {
    var _a, _b;
    var product = req.body;
    var _c = validateProperties(product), valid = _c[0], property = _c[1];
    if (!valid) {
        return res.status(400).json({ message: "\"" + property + "\" is required" });
    }
    _a = validateValueType(product), valid = _a[0], property = _a[1];
    if (!valid) {
        return res.status(422).json({ message: "\"" + property + "\" must be a string" });
    }
    _b = validateValues(product), valid = _b[0], property = _b[1];
    if (!valid) {
        return res.status(422).json({
            message: "\"" + property + "\" length must be at least 3 characters long",
        });
    }
    next();
}
exports.default = validationBook;
