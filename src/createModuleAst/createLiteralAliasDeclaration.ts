import * as ts from 'typescript'
import flatten from 'lodash.flatten'
import { FileInfo } from '../types'
import {
  isExpectedIdentifierVariableStatement,
  getVariableDeclarationFromVariableStatement,
  getMethodDeclarationNamesFromVariableDeclaration
} from './helpers'
//_______________________________________________________
//
function getSignature(
  fileInfo: FileInfo,
  identifier: string,
  moduleAliasTypeName: string
) {
  const nameSpace =
    fileInfo.nameSpace === ''
      ? ''
      : `${fileInfo.nameSpace}/`
  return ts.createPropertySignature(
    undefined,
    ts.createStringLiteral(`${nameSpace}${identifier}`),
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
}
function createPropertySignatures(
  node: ts.VariableDeclaration | null,
  fileInfo: FileInfo,
  moduleAliasTypeName: string
) {
  const identifiers = getMethodDeclarationNamesFromVariableDeclaration(
    node
  )
  return identifiers.map(identifier =>
    getSignature(fileInfo, identifier, moduleAliasTypeName)
  )
}
function createPropertySignaturesFromSourceFile(
  sourceFile: ts.SourceFile,
  fileInfo: FileInfo,
  moduleAliasTypeName: string,
  variableDeclarationName: string
) {
  const typeDefinitions = sourceFile.getChildAt(0)
  return flatten(
    typeDefinitions
      .getChildren()
      .filter(ts.isVariableStatement)
      .filter(node =>
        isExpectedIdentifierVariableStatement(
          node,
          variableDeclarationName
        )
      )
      .map(getVariableDeclarationFromVariableStatement)
      .map(node =>
        createPropertySignatures(
          node,
          fileInfo,
          moduleAliasTypeName
        )
      )
      .filter(
        (node): node is ts.PropertySignature[] =>
          node !== undefined
      )
  )
}
//_______________________________________________________
//
export const createLiteralAliasDeclaration = (
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
    )!
  )
