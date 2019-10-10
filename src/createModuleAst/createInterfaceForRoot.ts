import * as ts from 'typescript'
import { FileInfo } from '../types'
import {
  isExpectedIdentifierVariableStatement,
  getVariableDeclarationFromVariableStatement,
  getMethodNamesFromVariableDeclaration
} from './helpers'
//_______________________________________________________
//
function getStringLiteralIdentifier(
  fileInfo: FileInfo,
  identifier: string
) {
  if (fileInfo.nameSpace === '') return identifier
  return `${fileInfo.nameSpace}/${identifier}`
}
//_______________________________________________________
//
const getPropertySignature = (
  fileInfo: FileInfo,
  identifier: string,
  aliasTypeName: string
) =>
  ts.createPropertySignature(
    undefined,
    ts.createStringLiteral(
      getStringLiteralIdentifier(fileInfo, identifier)
    ),
    undefined,
    ts.createIndexedAccessTypeNode(
      ts.createIndexedAccessTypeNode(
        ts.createTypeReferenceNode(
          ts.createIdentifier(aliasTypeName),
          undefined
        ),
        ts.createLiteralTypeNode(
          ts.createStringLiteral(fileInfo.nameSpace)
        )
      ),
      ts.createLiteralTypeNode(
        ts.createStringLiteral(identifier)
      )
    ),
    undefined
  )
//_______________________________________________________
//
const getPropertySignaturesFromSourceFile = (
  sourceFile: ts.SourceFile,
  fileInfo: FileInfo,
  aliasTypeName: string,
  variableDeclarationName: string
) =>
  sourceFile
    .getChildAt(0)
    .getChildren()
    .filter(ts.isVariableStatement)
    .filter(
      isExpectedIdentifierVariableStatement(
        variableDeclarationName
      )
    )
    .map(getVariableDeclarationFromVariableStatement)
    .map(getMethodNamesFromVariableDeclaration)
    .map(identifiers =>
      identifiers.map(identifier =>
        getPropertySignature(
          fileInfo,
          identifier,
          aliasTypeName
        )
      )
    )[0]
//_______________________________________________________
//
export const createInterfaceForRoot = (
  sourceFile: ts.SourceFile,
  fileInfo: FileInfo,
  distTypeName: string,
  aliasTypeName: string,
  variableDeclarationName: string
) =>
  ts.createInterfaceDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(distTypeName),
    undefined,
    undefined,
    getPropertySignaturesFromSourceFile(
      sourceFile,
      fileInfo,
      aliasTypeName,
      variableDeclarationName
    )
  )
