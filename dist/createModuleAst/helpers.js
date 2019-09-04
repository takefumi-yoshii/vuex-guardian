"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = __importStar(require("typescript"));
//_______________________________________________________
//
function isExpectedIdentifierVariableStatement(identifier) {
    return function (node) {
        var res = false;
        node.forEachChild(function (child) {
            if (ts.isVariableDeclarationList(child)) {
                child.forEachChild(function (child) {
                    if (ts.isVariableDeclaration(child)) {
                        if (ts.isIdentifier(child.name)) {
                            res = child.name.text === identifier;
                        }
                    }
                });
            }
        });
        return res;
    };
}
exports.isExpectedIdentifierVariableStatement = isExpectedIdentifierVariableStatement;
function getVariableDeclarationFromVariableStatement(node) {
    var decl = null;
    node.forEachChild(function (child) {
        if (ts.isVariableDeclarationList(child)) {
            child.forEachChild(function (child) {
                if (ts.isVariableDeclaration(child)) {
                    decl = child;
                }
            });
        }
    });
    return decl;
}
exports.getVariableDeclarationFromVariableStatement = getVariableDeclarationFromVariableStatement;
function getMethodDeclarationNamesFromVariableDeclaration(node) {
    var names = [];
    if (!node)
        return names;
    if (!ts.isIdentifier(node.name))
        return names;
    node.forEachChild(function (child) {
        if (ts.isObjectLiteralExpression(child)) {
            child.forEachChild(function (child) {
                if (ts.isMethodDeclaration(child)) {
                    if (ts.isIdentifier(child.name)) {
                        names.push(child.name.text);
                    }
                }
            });
        }
    });
    return names;
}
exports.getMethodDeclarationNamesFromVariableDeclaration = getMethodDeclarationNamesFromVariableDeclaration;
