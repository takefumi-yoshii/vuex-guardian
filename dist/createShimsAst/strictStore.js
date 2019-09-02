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
exports.strictStore = function (constants) { return [
    ts.createInterfaceDeclaration(undefined, undefined, ts.createIdentifier(constants.STRICT_STORE), undefined, [
        ts.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
            ts.createExpressionWithTypeArguments([
                ts.createTypeReferenceNode(ts.createIdentifier(constants.ROOT_STATE), undefined)
            ], ts.createIdentifier('Store'))
        ])
    ], [
        ts.createPropertySignature(undefined, ts.createIdentifier('getters'), undefined, ts.createTypeReferenceNode(ts.createIdentifier(constants.ROOT_GETTERS), undefined), undefined),
        ts.createPropertySignature(undefined, ts.createIdentifier('commit'), undefined, ts.createTypeReferenceNode(ts.createIdentifier(constants.STRICT_COMMIT), [
            ts.createTypeReferenceNode(ts.createIdentifier(constants.MUTATION_TYPES), undefined)
        ]), undefined),
        ts.createPropertySignature(undefined, ts.createIdentifier('dispatch'), undefined, ts.createTypeReferenceNode(ts.createIdentifier(constants.STRICT_DISPATCH), [
            ts.createTypeReferenceNode(ts.createIdentifier(constants.ACTION_TYPES), undefined)
        ]), undefined)
    ])
]; };
