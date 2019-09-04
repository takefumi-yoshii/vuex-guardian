import * as ts from 'typescript'
import { FileInfo, Constants } from '../types'
import { importClause } from '../astFactories/importClause'
import { importDeclaration } from '../astFactories/importDeclaration'
import { declareModule } from '../astFactories/declareModule'
import { createInterfaceForModules } from './createInterfaceForModules'
import { createInterfaceForLocalState } from './createInterfaceForLocalState'
import { createInterfaceForLocal } from './createInterfaceForLocal'
import { createInterfaceForRoot } from './createInterfaceForRoot'
import { createInterfaceForLocalContext } from './createInterfaceForLocalContext'
//_______________________________________________________
//
export const createModuleAst = (
  sourceFile: ts.SourceFile,
  fileInfo: FileInfo,
  constants: Constants
) => [
  importClause(constants.MODULE, fileInfo.fileImportPath),
  importDeclaration(constants.VUEX),
  declareModule(constants.VUEX, [
    createInterfaceForModules(fileInfo, constants),
    createInterfaceForLocalState(fileInfo, constants),
    createInterfaceForLocal(
      sourceFile,
      fileInfo,
      constants.LOCAL_GETTERS,
      constants.RETURN_TYPE,
      constants.GETTERS,
      constants
    ),
    createInterfaceForLocal(
      sourceFile,
      fileInfo,
      constants.LOCAL_MUTATION_TYPES,
      constants.ARGUMENT_2,
      constants.MUTATIONS,
      constants
    ),
    createInterfaceForLocal(
      sourceFile,
      fileInfo,
      constants.LOCAL_ACTION_TYPES,
      constants.ARGUMENT_2,
      constants.ACTIONS,
      constants
    ),
    createInterfaceForRoot(
      sourceFile,
      fileInfo,
      constants.ROOT_GETTERS,
      constants.LOCAL_GETTERS,
      constants.GETTERS
    ),
    createInterfaceForRoot(
      sourceFile,
      fileInfo,
      constants.MUTATION_TYPES,
      constants.LOCAL_MUTATION_TYPES,
      constants.MUTATIONS
    ),
    createInterfaceForRoot(
      sourceFile,
      fileInfo,
      constants.ACTION_TYPES,
      constants.LOCAL_ACTION_TYPES,
      constants.ACTIONS
    ),
    createInterfaceForLocalContext(fileInfo, constants)
  ])
]
