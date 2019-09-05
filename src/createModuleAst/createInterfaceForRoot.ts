import * as ts from 'typescript'
import { FileInfo } from '../types'
import {
  isExpectedIdentifierVariableStatement,
  getVariableDeclarationFromVariableStatement,
  getMethodDeclarationNamesFromVariableDeclaration
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
const getTypeReferenceNode = (
  fileInfo: FileInfo,
  identifier: string,
  moduleAliasTypeName: string
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
          ts.createIdentifier(moduleAliasTypeName),
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
const createPropertySignaturesFromSourceFile = (
  sourceFile: ts.SourceFile,
  fileInfo: FileInfo,
  moduleAliasTypeName: string,
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
    .map(getMethodDeclarationNamesFromVariableDeclaration)
    .map(identifiers =>
      identifiers.map(identifier =>
        getTypeReferenceNode(
          fileInfo,
          identifier,
          moduleAliasTypeName
        )
      )
    )[0]
//_______________________________________________________
//
export const createInterfaceForRoot = (
  sourceFile: ts.SourceFile,
  fileInfo: FileInfo,
  distTypeName: string,
  moduleAliasTypeName: string,
  variableDeclarationName: string
) =>
  ts.createInterfaceDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(distTypeName),
    undefined,
    undefined,
    createPropertySignaturesFromSourceFile(
      sourceFile,
      fileInfo,
      moduleAliasTypeName,
      variableDeclarationName
    )
  )
