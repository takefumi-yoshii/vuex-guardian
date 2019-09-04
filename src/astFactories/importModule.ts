import * as ts from 'typescript'
import { FileInfo, Constants } from '../types'
//_______________________________________________________
//
export const importModule = (
  fileInfo: FileInfo,
  constants: Constants
) =>
  ts.createImportDeclaration(
    undefined,
    undefined,
    ts.createImportClause(
      undefined,
      ts.createNamespaceImport(
        ts.createIdentifier(constants.MODULE)
      )
    ),
    ts.createStringLiteral(fileInfo.importModulePath)
  )
