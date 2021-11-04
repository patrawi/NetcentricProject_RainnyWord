"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.generateJWT = void 0;
const jwt = require("jsonwebtoken");
function generateJWT() {
    const token = jwt.sign({ name: "admin", password: "admin123" }, process.env.TOKEN_SECRET, {
        expiresIn: "3600000",
    });
    return token;
}
exports.generateJWT = generateJWT;
function authenticateToken(token) {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    if (payload.name === "admin" && payload.password === "admin123")
        return true;
    return false;
}
exports.authenticateToken = authenticateToken;
