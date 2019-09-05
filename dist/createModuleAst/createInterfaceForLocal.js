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
var helpers_1 = require("./helpers");
//_______________________________________________________
//
var getPropertySignature = function (fileInfo, wrapUtilityTypeName, variableDeclarationName, identifier, constants) {
    return ts.createPropertySignature(undefined, ts.createIdentifier(identifier), undefined, ts.createTypeReferenceNode(ts.createIdentifier(wrapUtilityTypeName), [
        ts.createIndexedAccessTypeNode(ts.createIndexedAccessTypeNode(ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier(constants.MODULES), undefined), ts.createLiteralTypeNode(ts.createStringLiteral(fileInfo.nameSpace))), ts.createLiteralTypeNode(ts.createStringLiteral(variableDeclarationName))), ts.createLiteralTypeNode(ts.createStringLiteral(identifier)))
    ]), undefined);
};
//_______________________________________________________
//
var createPropertySignaturesFromSourceFile = function (sourceFile, fileInfo, wrapUtilityTypeName, variableDeclarationName, constants) {
    return sourceFile
        .getChildAt(0)
        .getChildren()
        .filter(ts.isVariableStatement)
        .filter(helpers_1.isExpectedIdentifierVariableStatement(variableDeclarationName))
        .map(helpers_1.getVariableDeclarationFromVariableStatement)
        .map(helpers_1.getMethodDeclarationNamesFromVariableDeclaration)
        .map(function (identifiers) {
        return identifiers.map(function (identifier) {
            return getPropertySignature(fileInfo, wrapUtilityTypeName, variableDeclarationName, identifier, constants);
        });
    })[0];
};
//_______________________________________________________
//
exports.createInterfaceForLocal = function (sourceFile, fileInfo, distTypeName, wrapUtilityTypeName, variableDeclarationName, constants) {
    return ts.createInterfaceDeclaration(undefined, undefined, ts.createIdentifier(distTypeName), undefined, undefined, [
        ts.createPropertySignature(undefined, ts.createStringLiteral(fileInfo.nameSpace), undefined, ts.createTypeLiteralNode(createPropertySignaturesFromSourceFile(sourceFile, fileInfo, wrapUtilityTypeName, variableDeclarationName, constants)), undefined)
    ]);
};
