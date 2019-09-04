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
var argument2_1 = require("./argument2");
var strictCommit_1 = require("./strictCommit");
var strictDispatch_1 = require("./strictDispatch");
var strictContext_1 = require("./strictContext");
var strictStore_1 = require("./strictStore");
var rootState_1 = require("./rootState");
var rootContext_1 = require("./rootContext");
//_______________________________________________________
//
exports.createShimsAst = function (fileInfos, constants) { return [
    ts.createImportDeclaration(undefined, undefined, undefined, ts.createStringLiteral(constants.VUEX)),
    ts.createModuleDeclaration(undefined, [ts.createModifier(ts.SyntaxKind.DeclareKeyword)], ts.createStringLiteral(constants.VUEX), ts.createModuleBlock(argument2_1.argument2(constants).concat(strictCommit_1.strictCommit(constants), strictDispatch_1.strictDispatch(constants), strictContext_1.strictContext(constants), strictStore_1.strictStore(constants), rootState_1.rootState(fileInfos, constants), rootContext_1.rootContext(constants))))
]; };
