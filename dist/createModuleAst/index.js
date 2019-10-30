"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var importClause_1 = require("../astFactories/importClause");
var importDeclaration_1 = require("../astFactories/importDeclaration");
var declareModule_1 = require("../astFactories/declareModule");
var createInterfaceForModules_1 = require("./createInterfaceForModules");
var createInterfaceForLocalState_1 = require("./createInterfaceForLocalState");
var createInterfaceForLocal_1 = require("./createInterfaceForLocal");
var createInterfaceForRoot_1 = require("./createInterfaceForRoot");
var createInterfaceForLocalContext_1 = require("./createInterfaceForLocalContext");
//_______________________________________________________
//
var makeRelativePath = function (info) { return path.relative(info.distDir, info.filePath); };
exports.createModuleAst = function (sourceFile, fileInfo, constants) { return [
    importClause_1.importClause(constants.MODULE, makeRelativePath(fileInfo)),
    importDeclaration_1.importDeclaration(constants.VUEX),
    declareModule_1.declareModule(constants.VUEX, [
        createInterfaceForModules_1.createInterfaceForModules(fileInfo, constants),
        createInterfaceForLocalState_1.createInterfaceForLocalState(fileInfo, constants),
        createInterfaceForLocal_1.createInterfaceForLocal(sourceFile, fileInfo, constants.LOCAL_GETTERS, constants.RETURN_TYPE, constants.GETTERS, constants),
        createInterfaceForLocal_1.createInterfaceForLocal(sourceFile, fileInfo, constants.LOCAL_MUTATION_TYPES, constants.ARGUMENT_2, constants.MUTATIONS, constants),
        createInterfaceForLocal_1.createInterfaceForLocal(sourceFile, fileInfo, constants.LOCAL_ACTION_TYPES, constants.ARGUMENT_2, constants.ACTIONS, constants),
        createInterfaceForRoot_1.createInterfaceForRoot(sourceFile, fileInfo, constants.ROOT_GETTERS, constants.LOCAL_GETTERS, constants.GETTERS),
        createInterfaceForRoot_1.createInterfaceForRoot(sourceFile, fileInfo, constants.MUTATION_TYPES, constants.LOCAL_MUTATION_TYPES, constants.MUTATIONS),
        createInterfaceForRoot_1.createInterfaceForRoot(sourceFile, fileInfo, constants.ACTION_TYPES, constants.LOCAL_ACTION_TYPES, constants.ACTIONS),
        createInterfaceForLocalContext_1.createInterfaceForLocalContext(fileInfo, constants)
    ])
]; };
