"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = __importStar(require("typescript"));
var lodash_flatten_1 = __importDefault(require("lodash.flatten"));
var helpers_1 = require("./helpers");
//_______________________________________________________
//
function getSignature(fileInfo, identifier, moduleAliasTypeName) {
    var nameSpace = fileInfo.nameSpace === ''
        ? ''
        : fileInfo.nameSpace + "/";
    return ts.createPropertySignature(undefined, ts.createStringLiteral("" + nameSpace + identifier), undefined, ts.createIndexedAccessTypeNode(ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier(moduleAliasTypeName), undefined), ts.createLiteralTypeNode(ts.createStringLiteral(fileInfo.nameSpace))), ts.createLiteralTypeNode(ts.createStringLiteral(identifier))), undefined);
}
function createPropertySignatures(node, fileInfo, moduleAliasTypeName) {
    var identifiers = helpers_1.getMethodDeclarationNamesFromVariableDeclaration(node);
    return identifiers.map(function (identifier) {
        return getSignature(fileInfo, identifier, moduleAliasTypeName);
    });
}
function createPropertySignaturesFromSourceFile(sourceFile, fileInfo, moduleAliasTypeName, variableDeclarationName) {
    var typeDefinitions = sourceFile.getChildAt(0);
    return lodash_flatten_1.default(typeDefinitions
        .getChildren()
        .filter(ts.isVariableStatement)
        .filter(function (node) {
        return helpers_1.isExpectedIdentifierVariableStatement(node, variableDeclarationName);
    })
        .map(helpers_1.getVariableDeclarationFromVariableStatement)
        .map(function (node) {
        return createPropertySignatures(node, fileInfo, moduleAliasTypeName);
    })
        .filter(function (node) {
        return node !== undefined;
    }));
}
//_______________________________________________________
//
exports.createInterfaceForRoot = function (sourceFile, fileInfo, distTypeName, moduleAliasTypeName, variableDeclarationName) {
    return ts.createInterfaceDeclaration(undefined, undefined, ts.createIdentifier(distTypeName), undefined, undefined, createPropertySignaturesFromSourceFile(sourceFile, fileInfo, moduleAliasTypeName, variableDeclarationName));
};
