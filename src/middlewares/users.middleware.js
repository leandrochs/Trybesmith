"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var properties = ['username', 'classe', 'level', 'password'];
// id?: number
// username: string;
// classe: string;
// level: number;
// password: string;
function validateProperties(user) {
    for (var i = 0; i < properties.length; i += 1) {
        if (!Object.prototype.hasOwnProperty.call(user, properties[i])) {
            return [false, properties[i], null];
        }
    }
    return [true, null, null];
}
function validateValueType(user) {
    if (typeof user.username !== 'string')
        return [false, 'username', 'string'];
    if (typeof user.classe !== 'string')
        return [false, 'classe', 'string'];
    if (typeof user.password !== 'string')
        return [false, 'password', 'string'];
    if (typeof user.level !== 'number')
        return [false, 'level', 'number'];
    return [true, null, null];
}
function validateValues(user) {
    var entries = Object.entries(user);
    for (var i = 0; i < entries.length; i += 1) {
        var _a = entries[i], property = _a[0], value = _a[1];
        if (value.length < 3) {
            return [false, property, null];
        }
    }
    return [true, null, null];
}
function validateLength(user) {
    if (user.level < 1)
        return [false, 'level', '"level" must be greater than or equal to 1'];
    if (user.password.length < 8) {
        return [false, 'password', '"password" length must be at least 8 characters long'];
    }
    return [true, null, null];
}
function validationBook(req, res, next) {
    var _a, _b, _c;
    var user = req.body;
    var _d = validateProperties(user), valid = _d[0], property = _d[1], message = _d[2];
    if (!valid) {
        return res.status(400).json({ message: "\"" + property + "\" is required" });
    }
    _a = validateValueType(user), valid = _a[0], property = _a[1], message = _a[2];
    if (!valid) {
        return res.status(422).json({ message: "\"" + property + "\" must be a " + message });
    }
    _b = validateLength(user), valid = _b[0], property = _b[1], message = _b[2];
    if (!valid)
        return res.status(422).json({ message: message });
    _c = validateValues(user), valid = _c[0], property = _c[1], message = _c[2];
    if (!valid) {
        return res.status(422).json({
            message: "\"" + property + "\" length must be at least 3 characters long",
        });
    }
    next();
}
exports.default = validationBook;
