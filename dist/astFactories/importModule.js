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
exports.importModule = function (fileInfo, constants) {
    return ts.createImportDeclaration(undefined, undefined, ts.createImportClause(undefined, ts.createNamespaceImport(ts.createIdentifier(constants.MODULE))), ts.createStringLiteral(fileInfo.importModulePath));
};
