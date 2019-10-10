"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var importDeclaration_1 = require("../astFactories/importDeclaration");
var declareModule_1 = require("../astFactories/declareModule");
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
    importDeclaration_1.importDeclaration(constants.VUEX),
    declareModule_1.declareModule(constants.VUEX, __spreadArrays([
        argument2_1.argument2(constants)
    ], strictCommit_1.strictCommit(constants), strictDispatch_1.strictDispatch(constants), [
        strictContext_1.strictContext(constants),
        strictStore_1.strictStore(constants),
        rootState_1.rootState(fileInfos, constants),
        rootContext_1.rootContext(constants)
    ]))
]; };
