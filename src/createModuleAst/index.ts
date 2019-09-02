import * as ts from 'typescript'
import { FileInfo, Constants } from '../types'
import { importModule } from './importModule'
import { importByLiteral } from './importByLiteral'
import { declareModule } from './declareModule'
import { createImoprtModules } from './createImoprtModules'
import { createNestInterfaceDeclaration } from './createNestInterfaceDeclaration'
import { createFlatInterfaceDeclaration } from './createFlatInterfaceDeclaration'
import { createLiteralAliasDeclaration } from './createLiteralAliasDeclaration'
import { createLocalContext } from './createLocalContext'
//_______________________________________________________
//
export const createModuleAst = (
  sourceFile: ts.SourceFile,
  fileInfo: FileInfo,
  constants: Constants
) => [
  importModule(fileInfo, constants),
  importByLiteral(constants.VUEX),
  declareModule(constants.VUEX, [
    createImoprtModules(fileInfo, constants),
    createNestInterfaceDeclaration(
      fileInfo,
      constants.LOCAL_STATE,
      constants.RETURN_TYPE,
      constants.STATE,
      constants
    ),
    createFlatInterfaceDeclaration(
      sourceFile,
      fileInfo,
      constants.LOCAL_GETTERS,
      constants.RETURN_TYPE,
      constants.GETTERS,
      constants
    ),
    createFlatInterfaceDeclaration(
      sourceFile,
      fileInfo,
      constants.LOCAL_MUTATION_TYPES,
      constants.ARGUMENT_2,
      constants.MUTATIONS,
      constants
    ),
    createFlatInterfaceDeclaration(
      sourceFile,
      fileInfo,
      constants.LOCAL_ACTION_TYPES,
      constants.ARGUMENT_2,
      constants.ACTIONS,
      constants
    ),
    createLiteralAliasDeclaration(
      sourceFile,
      fileInfo,
      constants.ROOT_GETTERS,
      constants.LOCAL_GETTERS,
      constants.GETTERS
    ),
    createLiteralAliasDeclaration(
      sourceFile,
      fileInfo,
      constants.MUTATION_TYPES,
      constants.LOCAL_MUTATION_TYPES,
      constants.MUTATIONS
    ),
    createLiteralAliasDeclaration(
      sourceFile,
      fileInfo,
      constants.ACTION_TYPES,
      constants.LOCAL_ACTION_TYPES,
      constants.ACTIONS
    ),
    createLocalContext(
      fileInfo,
      constants.LOCAL_CONTEXT,
      constants
    )
  ])
]
