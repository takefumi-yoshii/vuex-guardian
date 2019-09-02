import * as ts from 'typescript'
import { FileInfo, Constants } from '../types'
//_______________________________________________________
//
function createPropertySignatures(
  fileInfo: FileInfo,
  constants: Constants
) {
  return [
    ts.createPropertySignature(
      undefined,
      ts.createStringLiteral(fileInfo.namespace),
      undefined,
      ts.createTypeQueryNode(
        ts.createIdentifier(constants.MODULE)
      ),
      undefined
    )
  ]
}
//_______________________________________________________
//
export const createImoprtModules = (
  fileInfo: FileInfo,
  constants: Constants
) =>
  ts.createInterfaceDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(constants.MODULES),
    undefined,
    undefined,
    createPropertySignatures(fileInfo, constants)
  )
