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
function createPropertySignatures(typeFile, constants) {
    return [
        ts.createPropertySignature(undefined, ts.createStringLiteral(typeFile.namespace), undefined, ts.createTypeQueryNode(ts.createIdentifier(constants.MODULE)), undefined)
    ];
}
//_______________________________________________________
//
exports.default = (function (typeFile, constants) {
    return ts.createInterfaceDeclaration(undefined, undefined, ts.createIdentifier(constants.MODULES), undefined, undefined, createPropertySignatures(typeFile, constants));
});
