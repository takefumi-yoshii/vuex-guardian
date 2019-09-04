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
function getSignature(fileInfo, wrapUtilityTypeName, variableDeclarationName, constants) {
    return ts.createTypeReferenceNode(ts.createIdentifier(wrapUtilityTypeName), [
        ts.createIndexedAccessTypeNode(ts.createIndexedAccessTypeNode(ts.createTypeReferenceNode(ts.createIdentifier(constants.MODULES), undefined), ts.createLiteralTypeNode(ts.createStringLiteral(fileInfo.nameSpace))), ts.createLiteralTypeNode(ts.createStringLiteral(variableDeclarationName)))
    ]);
}
//_______________________________________________________
//
exports.rootState = function (fileInfos, constants) {
    var node = fileInfos.map(function (fileInfo) {
        var current = 0;
        if (!fileInfo.fileDir[current]) {
            return getSignature(fileInfo, constants.RETURN_TYPE, constants.STATE, constants);
        }
        var visit = function () {
            if (fileInfo.fileDir[current + 1]) {
                current++;
                return ts.createPropertySignature(undefined, ts.createIdentifier(fileInfo.fileDir[current - 1]), undefined, ts.createTypeLiteralNode([visit()]), undefined);
            }
            else {
                return ts.createPropertySignature(undefined, ts.createIdentifier(fileInfo.fileDir[current]), undefined, getSignature(fileInfo, constants.RETURN_TYPE, constants.STATE, constants), undefined);
            }
        };
        return ts.createTypeLiteralNode([visit()]);
    });
    return [
        ts.createTypeAliasDeclaration(undefined, undefined, ts.createIdentifier(constants.ROOT_STATE), undefined, ts.createIntersectionTypeNode(node))
    ];
};
