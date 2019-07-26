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
function getSignature(typeFile, wrapUtilityTypeName, variableDeclarationName, identifier, constants) {
    return ts.createPropertySignature(undefined, ts.createIdentifier(identifier), undefined, ts.createTypeReferenceNode(ts.createIdentifier(wrapUtilityTypeName), [
        ts.createIndexedAccessTypeNode(ts.createIndexedAccessTypeNode(ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier(constants.MODULES), undefined), ts.createLiteralTypeNode(ts.createStringLiteral(typeFile.namespace))), ts.createLiteralTypeNode(ts.createStringLiteral(variableDeclarationName))), ts.createLiteralTypeNode(ts.createStringLiteral(identifier)))
    ]), undefined);
}
function createPropertySignatures(node, typeFile, wrapUtilityTypeName, variableDeclarationName, constants) {
    var identifiers = helpers_1.getMethodDeclarationNamesFromVariableDeclaration(node);
    return identifiers.map(function (identifier) {
        return getSignature(typeFile, wrapUtilityTypeName, variableDeclarationName, identifier, constants);
    });
}
function createPropertySignaturesFromSourceFile(program, typeFile, wrapUtilityTypeName, variableDeclarationName, constants) {
    var sourceFile = program.getSourceFile(typeFile.filePath);
    if (!sourceFile)
        return;
    var typeDefinitions = sourceFile.getChildAt(0);
    return lodash_flatten_1.default(typeDefinitions
        .getChildren()
        .filter(function (node) {
        return ts.isVariableStatement(node);
    })
        .filter(function (node) {
        return helpers_1.isExpectedIdentifierVariableStatement(node, variableDeclarationName);
    })
        .map(function (node) { return helpers_1.getVariableDeclarationFromVariableStatement(node); })
        .map(function (node) {
        return createPropertySignatures(node, typeFile, wrapUtilityTypeName, variableDeclarationName, constants);
    })
        .filter(function (node) { return node !== undefined; }));
}
//_______________________________________________________
//
exports.default = (function (program, typeFile, distTypeName, wrapUtilityTypeName, variableDeclarationName, constants) {
    return ts.createInterfaceDeclaration(undefined, undefined, ts.createIdentifier(distTypeName), undefined, undefined, [
        ts.createPropertySignature(undefined, ts.createStringLiteral(typeFile.namespace), undefined, ts.createTypeLiteralNode(createPropertySignaturesFromSourceFile(program, typeFile, wrapUtilityTypeName, variableDeclarationName, constants)), undefined)
    ]);
});
