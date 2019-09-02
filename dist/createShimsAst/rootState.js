"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = __importStar(require("typescript"));
var lodash_flatten_1 = __importDefault(require("lodash.flatten"));
//_______________________________________________________
//
function getSignature(fileTree, wrapUtilityTypeName, variableDeclarationName, constants) {
    return ts.createTypeReferenceNode(ts.createIdentifier(wrapUtilityTypeName), [
        ts.createIndexedAccessTypeNode(ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier(constants.MODULES), undefined), ts.createLiteralTypeNode(ts.createStringLiteral(fileTree.namespace))), ts.createLiteralTypeNode(ts.createStringLiteral(variableDeclarationName)))
    ]);
}
//_______________________________________________________
//
exports.rootState = function (fileTree, constants) {
    var recurse = function (tree) {
        return tree
            .map(function (definition) {
            var node = [];
            var name = definition.fileName;
            var children = definition.children;
            if (children) {
                node.push(ts.createPropertySignature(undefined, ts.createIdentifier(name), undefined, ts.createIntersectionTypeNode([
                    getSignature(children[0], constants.RETURN_TYPE, constants.STATE, constants),
                    ts.createTypeLiteralNode(lodash_flatten_1.default(recurse(children)))
                ]), undefined));
            }
            return node;
        })
            .filter(function (element) {
            return element !== undefined;
        });
    };
    if (fileTree.filter(function (tree) { return tree.fileName === 'index.ts'; })
        .length) {
        return [
            ts.createTypeAliasDeclaration(undefined, undefined, ts.createIdentifier(constants.ROOT_STATE), undefined, ts.createIntersectionTypeNode([
                ts.createTypeLiteralNode(lodash_flatten_1.default(recurse(fileTree))),
                ts.createTypeReferenceNode(ts.createIdentifier(constants.RETURN_TYPE), [
                    ts.createIndexedAccessTypeNode(ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier(constants.MODULES), undefined), ts.createLiteralTypeNode(ts.createStringLiteral(''))), ts.createLiteralTypeNode(ts.createStringLiteral(constants.STATE)))
                ])
            ]))
        ];
    }
    return [
        ts.createTypeAliasDeclaration(undefined, undefined, ts.createIdentifier(constants.ROOT_STATE), undefined, ts.createTypeLiteralNode(lodash_flatten_1.default(recurse(fileTree))))
    ];
};
