"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var importByLiteral_1 = require("../astFactories/importByLiteral");
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
    importByLiteral_1.importByLiteral(constants.VUEX),
    declareModule_1.declareModule(constants.VUEX, [
        argument2_1.argument2(constants)
    ].concat(strictCommit_1.strictCommit(constants), strictDispatch_1.strictDispatch(constants), [
        strictContext_1.strictContext(constants),
        strictStore_1.strictStore(constants),
        rootState_1.rootState(fileInfos, constants),
        rootContext_1.rootContext(constants)
    ]))
]; };
