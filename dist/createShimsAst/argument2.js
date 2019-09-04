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
exports.argument2 = function (constants) {
    return ts.createTypeAliasDeclaration(undefined, undefined, ts.createIdentifier(constants.ARGUMENT_2), [
        ts.createTypeParameterDeclaration(ts.createIdentifier('T'), undefined, undefined)
    ], ts.createConditionalTypeNode(ts.createTypeReferenceNode(ts.createIdentifier('T'), undefined), ts.createFunctionTypeNode(undefined, [
        ts.createParameter(undefined, undefined, undefined, ts.createIdentifier('a1'), undefined, ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword), undefined),
        ts.createParameter(undefined, undefined, undefined, ts.createIdentifier('a2'), undefined, ts.createInferTypeNode(ts.createTypeParameterDeclaration(ts.createIdentifier('I'), undefined, undefined)), undefined)
    ], ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)), ts.createTypeReferenceNode(ts.createIdentifier('I'), undefined), ts.createKeywordTypeNode(ts.SyntaxKind.NeverKeyword)));
};
