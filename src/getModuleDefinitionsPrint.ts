import * as ts from "typescript";
import { TypeFile, Constants } from "./types";
import importModule from "./importModule";
import importByLiteral from "./importByLiteral";
import declareModule from "./declareModule";
import createImoprtModules from "./createImoprtModules";
import createNestInterfaceDeclaration from "./createNestInterfaceDeclaration";
import createFlatInterfaceDeclaration from "./createFlatInterfaceDeclaration";
import createLiteralAliasDeclaration from "./createLiteralAliasDeclaration";
import createLocalContext from "./createLocalContext";
//_______________________________________________________
//
export default (
  program: ts.Program,
  emptyFile: ts.SourceFile,
  printer: ts.Printer,
  typeFile: TypeFile,
  constants: Constants
) =>
  printer.printList(
    ts.ListFormat.MultiLine,
    ts.createNodeArray([
      importModule(typeFile, constants),
      importByLiteral(constants.VUEX),
      declareModule(constants.VUEX, [
        createImoprtModules(typeFile, constants),
        createNestInterfaceDeclaration(
          typeFile,
          constants.LOCAL_STATE,
          constants.RETURN_TYPE,
          constants.STATE,
          constants
        ),
        createFlatInterfaceDeclaration(
          program,
          typeFile,
          constants.LOCAL_GETTERS,
          constants.RETURN_TYPE,
          constants.GETTERS,
          constants
        ),
        createFlatInterfaceDeclaration(
          program,
          typeFile,
          constants.LOCAL_MUTATION_TYPES,
          constants.ARGUMENT_2,
          constants.MUTATIONS,
          constants
        ),
        createFlatInterfaceDeclaration(
          program,
          typeFile,
          constants.LOCAL_ACTION_TYPES,
          constants.ARGUMENT_2,
          constants.ACTIONS,
          constants
        ),
        createLiteralAliasDeclaration(
          program,
          typeFile,
          constants.ROOT_GETTERS,
          constants.LOCAL_GETTERS,
          constants.GETTERS
        ),
        createLiteralAliasDeclaration(
          program,
          typeFile,
          constants.MUTATION_TYPES,
          constants.LOCAL_MUTATION_TYPES,
          constants.MUTATIONS
        ),
        createLiteralAliasDeclaration(
          program,
          typeFile,
          constants.ACTION_TYPES,
          constants.LOCAL_ACTION_TYPES,
          constants.ACTIONS
        ),
        createLocalContext(typeFile, constants.LOCAL_CONTEXT, constants)
      ])
    ]),
    emptyFile
  );
