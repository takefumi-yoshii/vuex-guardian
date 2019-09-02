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
function createIndexedAccessTypeNodes(fileInfo, constants) {
    return [
        ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier(constants.LOCAL_STATE), undefined), ts.createLiteralTypeNode(ts.createStringLiteral(fileInfo.namespace))),
        ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier(constants.LOCAL_GETTERS), undefined), ts.createLiteralTypeNode(ts.createStringLiteral(fileInfo.namespace))),
        ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier(constants.LOCAL_MUTATION_TYPES), undefined), ts.createLiteralTypeNode(ts.createStringLiteral(fileInfo.namespace))),
        ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier(constants.LOCAL_ACTION_TYPES), undefined), ts.createLiteralTypeNode(ts.createStringLiteral(fileInfo.namespace)))
    ];
}
function createPropertySignatures(fileInfo, constants) {
    return [
        ts.createPropertySignature(undefined, ts.createStringLiteral(fileInfo.namespace), undefined, ts.createTypeReferenceNode(ts.createIdentifier(constants.STRICT_CONTEXT), createIndexedAccessTypeNodes(fileInfo, constants)), undefined)
    ];
}
//_______________________________________________________
//
exports.createLocalContext = function (fileInfo, distTypeName, constants) {
    return ts.createInterfaceDeclaration(undefined, undefined, ts.createIdentifier(distTypeName), undefined, undefined, createPropertySignatures(fileInfo, constants));
};
