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
  const namespace =
    fileInfo.namespace === ''
      ? ''
      : `${fileInfo.namespace}/`
  return ts.createPropertySignature(
    undefined,
    ts.createStringLiteral(`${namespace}${identifier}`),
    undefined,
    ts.createIndexedAccessTypeNode(
      ts.createIndexedAccessTypeNode(
        ts.createTypeReferenceNode(
          ts.createIdentifier(moduleAliasTypeName),
          undefined
        ),
        ts.createLiteralTypeNode(
          ts.createStringLiteral(fileInfo.namespace)
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
  program: ts.Program,
  fileInfo: FileInfo,
  moduleAliasTypeName: string,
  variableDeclarationName: string
) {
  const sourceFile = program.getSourceFile(
    fileInfo.filePath
  )
  if (!sourceFile) return
  const typeDefinitions = sourceFile.getChildAt(0)
  return flatten(
    typeDefinitions
      .getChildren()
      .filter((node): node is ts.VariableStatement =>
        ts.isVariableStatement(node)
      )
      .filter(node =>
        isExpectedIdentifierVariableStatement(
          node,
          variableDeclarationName
        )
      )
      .map(node =>
        getVariableDeclarationFromVariableStatement(node)
      )
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
  program: ts.Program,
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
      program,
      fileInfo,
      moduleAliasTypeName,
      variableDeclarationName
    )!
  )
