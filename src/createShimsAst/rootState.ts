import * as ts from 'typescript'
import { FileInfo, Constants } from '../types'
//_______________________________________________________
//
const getTypeReferenceNode = (
  fileInfo: FileInfo,
  wrapUtilityTypeName: string,
  variableDeclarationName: string,
  constants: Constants
) =>
  ts.createTypeReferenceNode(
    ts.createIdentifier(wrapUtilityTypeName),
    [
      ts.createIndexedAccessTypeNode(
        ts.createIndexedAccessTypeNode(
          ts.createTypeReferenceNode(
            ts.createIdentifier(constants.MODULES),
            undefined
          ),
          ts.createLiteralTypeNode(
            ts.createStringLiteral(fileInfo.nameSpace)
          )
        ),
        ts.createLiteralTypeNode(
          ts.createStringLiteral(variableDeclarationName)
        )
      )
    ]
  )
//_______________________________________________________
//
const getIntersectionTypeNode = (
  fileInfos: FileInfo[],
  constants: Constants
) =>
  fileInfos.map(fileInfo => {
    let current = 0
    if (!fileInfo.fileTreeKeys[current]) {
      // for Root Module
      return getTypeReferenceNode(
        fileInfo,
        constants.RETURN_TYPE,
        constants.STATE,
        constants
      )
    }
    const visit = (): ts.TypeElement => {
      if (fileInfo.fileTreeKeys[current + 1]) {
        // for Nest Node
        current++
        return ts.createPropertySignature(
          undefined,
          ts.createIdentifier(
            fileInfo.fileTreeKeys[current - 1]
          ),
          undefined,
          ts.createTypeLiteralNode([visit()]),
          undefined
        )
      } else {
        // for Signature Node
        return ts.createPropertySignature(
          undefined,
          ts.createIdentifier(
            fileInfo.fileTreeKeys[current]
          ),
          undefined,
          getTypeReferenceNode(
            fileInfo,
            constants.RETURN_TYPE,
            constants.STATE,
            constants
          ),
          undefined
        )
      }
    }
    return ts.createTypeLiteralNode([visit()])
  })
//_______________________________________________________
//
export const rootState = (
  fileInfos: FileInfo[],
  constants: Constants
) =>
  ts.createTypeAliasDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(constants.ROOT_STATE),
    undefined,
    ts.createIntersectionTypeNode(
      getIntersectionTypeNode(fileInfos, constants)
    )
  )
