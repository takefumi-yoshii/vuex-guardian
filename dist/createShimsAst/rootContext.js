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
exports.rootContext = function (constants) {
    return ts.createTypeAliasDeclaration(undefined, undefined, ts.createIdentifier(constants.ROOT_CONTEXT), undefined, ts.createTypeReferenceNode(ts.createIdentifier(constants.STRICT_CONTEXT), [
        ts.createTypeReferenceNode(ts.createIdentifier(constants.ROOT_STATE), undefined),
        ts.createTypeReferenceNode(ts.createIdentifier(constants.ROOT_GETTERS), undefined),
        ts.createTypeReferenceNode(ts.createIdentifier(constants.MUTATION_TYPES), undefined),
        ts.createTypeReferenceNode(ts.createIdentifier(constants.ACTION_TYPES), undefined)
    ]));
};
