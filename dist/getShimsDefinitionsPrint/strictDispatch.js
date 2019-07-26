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
exports.default = (function (constants) { return [
    ts.createInterfaceDeclaration(undefined, undefined, ts.createIdentifier(constants.STRICT_DISPATCH), [
        ts.createTypeParameterDeclaration(ts.createIdentifier("A"), undefined, undefined)
    ], undefined, [
        ts.createCallSignature([
            ts.createTypeParameterDeclaration(ts.createIdentifier("T"), ts.createTypeOperatorNode(ts.createTypeReferenceNode(ts.createIdentifier("A"), undefined)), undefined)
        ], [
            ts.createParameter(undefined, undefined, undefined, ts.createIdentifier("type"), undefined, ts.createTypeReferenceNode(ts.createIdentifier("T"), undefined), undefined),
            ts.createParameter(undefined, undefined, undefined, ts.createIdentifier("payload"), ts.createToken(ts.SyntaxKind.QuestionToken), ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier("A"), undefined), ts.createTypeReferenceNode(ts.createIdentifier("T"), undefined)), undefined),
            ts.createParameter(undefined, undefined, undefined, ts.createIdentifier("options"), ts.createToken(ts.SyntaxKind.QuestionToken), ts.createTypeReferenceNode(ts.createIdentifier("DispatchOptions"), undefined), undefined)
        ], ts.createTypeReferenceNode(ts.createIdentifier("Promise"), [
            ts.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
        ]))
    ]),
    ts.createInterfaceDeclaration(undefined, undefined, ts.createIdentifier(constants.STRICT_DISPATCH), [
        ts.createTypeParameterDeclaration(ts.createIdentifier("A"), undefined, undefined)
    ], undefined, [
        ts.createCallSignature([
            ts.createTypeParameterDeclaration(ts.createIdentifier("T"), ts.createTypeOperatorNode(ts.createTypeReferenceNode(ts.createIdentifier("A"), undefined)), undefined)
        ], [
            ts.createParameter(undefined, undefined, undefined, ts.createIdentifier("payloadWithType"), undefined, ts.createIntersectionTypeNode([
                ts.createTypeLiteralNode([
                    ts.createPropertySignature(undefined, ts.createIdentifier("type"), undefined, ts.createTypeReferenceNode(ts.createIdentifier("T"), undefined), undefined)
                ]),
                ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier("A"), undefined), ts.createTypeReferenceNode(ts.createIdentifier("T"), undefined))
            ]), undefined),
            ts.createParameter(undefined, undefined, undefined, ts.createIdentifier("options"), ts.createToken(ts.SyntaxKind.QuestionToken), ts.createTypeReferenceNode(ts.createIdentifier("DispatchOptions"), undefined), undefined)
        ], ts.createTypeReferenceNode(ts.createIdentifier("Promise"), [
            ts.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
        ]))
    ])
]; });
