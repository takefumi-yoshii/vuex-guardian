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
  program: ts.Program,
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
      program,
      fileInfo,
      constants.LOCAL_GETTERS,
      constants.RETURN_TYPE,
      constants.GETTERS,
      constants
    ),
    createFlatInterfaceDeclaration(
      program,
      fileInfo,
      constants.LOCAL_MUTATION_TYPES,
      constants.ARGUMENT_2,
      constants.MUTATIONS,
      constants
    ),
    createFlatInterfaceDeclaration(
      program,
      fileInfo,
      constants.LOCAL_ACTION_TYPES,
      constants.ARGUMENT_2,
      constants.ACTIONS,
      constants
    ),
    createLiteralAliasDeclaration(
      program,
      fileInfo,
      constants.ROOT_GETTERS,
      constants.LOCAL_GETTERS,
      constants.GETTERS
    ),
    createLiteralAliasDeclaration(
      program,
      fileInfo,
      constants.MUTATION_TYPES,
      constants.LOCAL_MUTATION_TYPES,
      constants.MUTATIONS
    ),
    createLiteralAliasDeclaration(
      program,
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
