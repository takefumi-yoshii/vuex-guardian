"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var importModule_1 = require("./importModule");
var importByLiteral_1 = require("./importByLiteral");
var declareModule_1 = require("./declareModule");
var createImoprtModules_1 = require("./createImoprtModules");
var createNestInterfaceDeclaration_1 = require("./createNestInterfaceDeclaration");
var createFlatInterfaceDeclaration_1 = require("./createFlatInterfaceDeclaration");
var createLiteralAliasDeclaration_1 = require("./createLiteralAliasDeclaration");
var createLocalContext_1 = require("./createLocalContext");
//_______________________________________________________
//
exports.createModuleAst = function (program, fileInfo, constants) { return [
    importModule_1.importModule(fileInfo, constants),
    importByLiteral_1.importByLiteral(constants.VUEX),
    declareModule_1.declareModule(constants.VUEX, [
        createImoprtModules_1.createImoprtModules(fileInfo, constants),
        createNestInterfaceDeclaration_1.createNestInterfaceDeclaration(fileInfo, constants.LOCAL_STATE, constants.RETURN_TYPE, constants.STATE, constants),
        createFlatInterfaceDeclaration_1.createFlatInterfaceDeclaration(program, fileInfo, constants.LOCAL_GETTERS, constants.RETURN_TYPE, constants.GETTERS, constants),
        createFlatInterfaceDeclaration_1.createFlatInterfaceDeclaration(program, fileInfo, constants.LOCAL_MUTATION_TYPES, constants.ARGUMENT_2, constants.MUTATIONS, constants),
        createFlatInterfaceDeclaration_1.createFlatInterfaceDeclaration(program, fileInfo, constants.LOCAL_ACTION_TYPES, constants.ARGUMENT_2, constants.ACTIONS, constants),
        createLiteralAliasDeclaration_1.createLiteralAliasDeclaration(program, fileInfo, constants.ROOT_GETTERS, constants.LOCAL_GETTERS, constants.GETTERS),
        createLiteralAliasDeclaration_1.createLiteralAliasDeclaration(program, fileInfo, constants.MUTATION_TYPES, constants.LOCAL_MUTATION_TYPES, constants.MUTATIONS),
        createLiteralAliasDeclaration_1.createLiteralAliasDeclaration(program, fileInfo, constants.ACTION_TYPES, constants.LOCAL_ACTION_TYPES, constants.ACTIONS),
        createLocalContext_1.createLocalContext(fileInfo, constants.LOCAL_CONTEXT, constants)
    ])
]; };
