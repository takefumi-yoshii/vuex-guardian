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
exports.strictContext = function (constants) { return [
    ts.createTypeAliasDeclaration(undefined, undefined, ts.createIdentifier(constants.STRICT_CONTEXT), [
        ts.createTypeParameterDeclaration(ts.createIdentifier('S'), undefined, undefined),
        ts.createTypeParameterDeclaration(ts.createIdentifier('G'), undefined, undefined),
        ts.createTypeParameterDeclaration(ts.createIdentifier('M'), undefined, undefined),
        ts.createTypeParameterDeclaration(ts.createIdentifier('A'), undefined, undefined)
    ], ts.createTypeLiteralNode([
        ts.createPropertySignature(undefined, ts.createIdentifier('state'), undefined, ts.createTypeReferenceNode(ts.createIdentifier('S'), undefined), undefined),
        ts.createPropertySignature(undefined, ts.createIdentifier('getters'), undefined, ts.createTypeReferenceNode(ts.createIdentifier('G'), undefined), undefined),
        ts.createPropertySignature(undefined, ts.createIdentifier('rootState'), undefined, ts.createTypeReferenceNode(ts.createIdentifier(constants.ROOT_STATE), undefined), undefined),
        ts.createPropertySignature(undefined, ts.createIdentifier('rootGetters'), undefined, ts.createTypeReferenceNode(ts.createIdentifier(constants.ROOT_GETTERS), undefined), undefined),
        ts.createPropertySignature(undefined, ts.createIdentifier('commit'), undefined, ts.createTypeReferenceNode(ts.createIdentifier(constants.STRICT_COMMIT), [
            ts.createTypeReferenceNode(ts.createIdentifier('M'), undefined)
        ]), undefined),
        ts.createPropertySignature(undefined, ts.createIdentifier('dispatch'), undefined, ts.createTypeReferenceNode(ts.createIdentifier(constants.STRICT_DISPATCH), [
            ts.createTypeReferenceNode(ts.createIdentifier('A'), undefined)
        ]), undefined)
    ]))
]; };
