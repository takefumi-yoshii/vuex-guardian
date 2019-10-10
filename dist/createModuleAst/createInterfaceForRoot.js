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
function getStringLiteralIdentifier(fileInfo, identifier) {
    if (fileInfo.nameSpace === '')
        return identifier;
    return fileInfo.nameSpace + "/" + identifier;
}
//_______________________________________________________
//
var getPropertySignature = function (fileInfo, identifier, aliasTypeName) {
    return ts.createPropertySignature(undefined, ts.createStringLiteral(getStringLiteralIdentifier(fileInfo, identifier)), undefined, ts.createIndexedAccessTypeNode(ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier(aliasTypeName), undefined), ts.createLiteralTypeNode(ts.createStringLiteral(fileInfo.nameSpace))), ts.createLiteralTypeNode(ts.createStringLiteral(identifier))), undefined);
};
//_______________________________________________________
//
var getPropertySignaturesFromSourceFile = function (sourceFile, fileInfo, aliasTypeName, variableDeclarationName) {
    return sourceFile
        .getChildAt(0)
        .getChildren()
        .filter(ts.isVariableStatement)
        .filter(helpers_1.isExpectedIdentifierVariableStatement(variableDeclarationName))
        .map(helpers_1.getVariableDeclarationFromVariableStatement)
        .map(helpers_1.getMethodNamesFromVariableDeclaration)
        .map(function (identifiers) {
        return identifiers.map(function (identifier) {
            return getPropertySignature(fileInfo, identifier, aliasTypeName);
        });
    })[0];
};
//_______________________________________________________
//
exports.createInterfaceForRoot = function (sourceFile, fileInfo, distTypeName, aliasTypeName, variableDeclarationName) {
    return ts.createInterfaceDeclaration(undefined, undefined, ts.createIdentifier(distTypeName), undefined, undefined, getPropertySignaturesFromSourceFile(sourceFile, fileInfo, aliasTypeName, variableDeclarationName));
};
