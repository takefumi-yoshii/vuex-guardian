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
exports.createInterfaceForLocalContext = function (fileInfo, constants) {
    return ts.createInterfaceDeclaration(undefined, undefined, ts.createIdentifier(constants.LOCAL_CONTEXT), undefined, undefined, [
        ts.createPropertySignature(undefined, ts.createStringLiteral(fileInfo.nameSpace), undefined, ts.createTypeReferenceNode(ts.createIdentifier(constants.STRICT_CONTEXT), [
            ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier(constants.LOCAL_STATE), undefined), ts.createLiteralTypeNode(ts.createStringLiteral(fileInfo.nameSpace))),
            ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier(constants.LOCAL_GETTERS), undefined), ts.createLiteralTypeNode(ts.createStringLiteral(fileInfo.nameSpace))),
            ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier(constants.LOCAL_MUTATION_TYPES), undefined), ts.createLiteralTypeNode(ts.createStringLiteral(fileInfo.nameSpace))),
            ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier(constants.LOCAL_ACTION_TYPES), undefined), ts.createLiteralTypeNode(ts.createStringLiteral(fileInfo.nameSpace)))
        ]), undefined)
    ]);
};
