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
var importModule_1 = __importDefault(require("./importModule"));
var importByLiteral_1 = __importDefault(require("./importByLiteral"));
var declareModule_1 = __importDefault(require("./declareModule"));
var createImoprtModules_1 = __importDefault(require("./createImoprtModules"));
var createNestInterfaceDeclaration_1 = __importDefault(require("./createNestInterfaceDeclaration"));
var createFlatInterfaceDeclaration_1 = __importDefault(require("./createFlatInterfaceDeclaration"));
var createLiteralAliasDeclaration_1 = __importDefault(require("./createLiteralAliasDeclaration"));
var createLocalContext_1 = __importDefault(require("./createLocalContext"));
//_______________________________________________________
//
exports.default = (function (program, emptyFile, printer, typeFile, constants) {
    return printer.printList(ts.ListFormat.MultiLine, ts.createNodeArray([
        importModule_1.default(typeFile, constants),
        importByLiteral_1.default(constants.VUEX),
        declareModule_1.default(constants.VUEX, [
            createImoprtModules_1.default(typeFile, constants),
            createNestInterfaceDeclaration_1.default(typeFile, constants.LOCAL_STATE, constants.RETURN_TYPE, constants.STATE, constants),
            createFlatInterfaceDeclaration_1.default(program, typeFile, constants.LOCAL_GETTERS, constants.RETURN_TYPE, constants.GETTERS, constants),
            createFlatInterfaceDeclaration_1.default(program, typeFile, constants.LOCAL_MUTATION_TYPES, constants.ARGUMENT_2, constants.MUTATIONS, constants),
            createFlatInterfaceDeclaration_1.default(program, typeFile, constants.LOCAL_ACTION_TYPES, constants.ARGUMENT_2, constants.ACTIONS, constants),
            createLiteralAliasDeclaration_1.default(program, typeFile, constants.ROOT_GETTERS, constants.LOCAL_GETTERS, constants.GETTERS),
            createLiteralAliasDeclaration_1.default(program, typeFile, constants.MUTATION_TYPES, constants.LOCAL_MUTATION_TYPES, constants.MUTATIONS),
            createLiteralAliasDeclaration_1.default(program, typeFile, constants.ACTION_TYPES, constants.LOCAL_ACTION_TYPES, constants.ACTIONS),
            createLocalContext_1.default(typeFile, constants.LOCAL_CONTEXT, constants)
        ])
    ]), emptyFile);
});
