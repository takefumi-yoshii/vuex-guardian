import * as ts from 'typescript'
import { FileInfo, Constants } from '../types'
//_______________________________________________________
//
function createIndexedAccessTypeNodes(
  fileInfo: FileInfo,
  constants: Constants
) {
  return [
    ts.createIndexedAccessTypeNode(
      ts.createTypeReferenceNode(
        ts.createIdentifier(constants.LOCAL_STATE),
        undefined
      ),
      ts.createLiteralTypeNode(
        ts.createStringLiteral(fileInfo.namespace)
      )
    ),
    ts.createIndexedAccessTypeNode(
      ts.createTypeReferenceNode(
        ts.createIdentifier(constants.LOCAL_GETTERS),
        undefined
      ),
      ts.createLiteralTypeNode(
        ts.createStringLiteral(fileInfo.namespace)
      )
    ),
    ts.createIndexedAccessTypeNode(
      ts.createTypeReferenceNode(
        ts.createIdentifier(constants.LOCAL_MUTATION_TYPES),
        undefined
      ),
      ts.createLiteralTypeNode(
        ts.createStringLiteral(fileInfo.namespace)
      )
    ),
    ts.createIndexedAccessTypeNode(
      ts.createTypeReferenceNode(
        ts.createIdentifier(constants.LOCAL_ACTION_TYPES),
        undefined
      ),
      ts.createLiteralTypeNode(
        ts.createStringLiteral(fileInfo.namespace)
      )
    )
  ]
}
function createPropertySignatures(
  fileInfo: FileInfo,
  constants: Constants
) {
  return [
    ts.createPropertySignature(
      undefined,
      ts.createStringLiteral(fileInfo.namespace),
      undefined,
      ts.createTypeReferenceNode(
        ts.createIdentifier(constants.STRICT_CONTEXT),
        createIndexedAccessTypeNodes(fileInfo, constants)
      ),
      undefined
    )
  ]
}
//_______________________________________________________
//
export const createLocalContext = (
  fileInfo: FileInfo,
  distTypeName: string,
  constants: Constants
) =>
  ts.createInterfaceDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(distTypeName),
    undefined,
    undefined,
    createPropertySignatures(fileInfo, constants)
  )
