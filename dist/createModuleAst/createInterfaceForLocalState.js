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
exports.createInterfaceForLocalState = function (fileInfo, constants) {
    return ts.createInterfaceDeclaration(undefined, undefined, ts.createIdentifier(constants.LOCAL_STATE), undefined, undefined, [
        ts.createPropertySignature(undefined, ts.createStringLiteral(fileInfo.nameSpace), undefined, ts.createTypeReferenceNode(ts.createIdentifier(constants.RETURN_TYPE), [
            ts.createIndexedAccessTypeNode(ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier(constants.MODULES), undefined), ts.createLiteralTypeNode(ts.createStringLiteral(fileInfo.nameSpace))), ts.createLiteralTypeNode(ts.createStringLiteral(constants.STATE)))
        ]), undefined)
    ]);
};
