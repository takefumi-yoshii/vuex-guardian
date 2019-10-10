import * as ts from 'typescript'
import { FileInfo, Constants } from '../types'
import {
  isExpectedIdentifierVariableStatement,
  getVariableDeclarationFromVariableStatement,
  getMethodNamesFromVariableDeclaration
} from './helpers'
//_______________________________________________________
//
const getPropertySignature = (
  fileInfo: FileInfo,
  utilityTypeName: string,
  variableDeclarationName: string,
  identifier: string,
  constants: Constants
) =>
  ts.createPropertySignature(
    undefined,
    ts.createIdentifier(identifier),
    undefined,
    ts.createTypeReferenceNode(
      ts.createIdentifier(utilityTypeName),
      [
        ts.createIndexedAccessTypeNode(
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
              ts.createStringLiteral(
                variableDeclarationName
              )
            )
          ),
          ts.createLiteralTypeNode(
            ts.createStringLiteral(identifier)
          )
        )
      ]
    ),
    undefined
  )
//_______________________________________________________
//
const getPropertySignaturesFromSourceFile = (
  sourceFile: ts.SourceFile,
  fileInfo: FileInfo,
  utilityTypeName: string,
  variableDeclarationName: string,
  constants: Constants
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
          utilityTypeName,
          variableDeclarationName,
          identifier,
          constants
        )
      )
    )[0]
//_______________________________________________________
//
export const createInterfaceForLocal = (
  sourceFile: ts.SourceFile,
  fileInfo: FileInfo,
  distTypeName: string,
  utilityTypeName: string,
  variableDeclarationName: string,
  constants: Constants
) =>
  ts.createInterfaceDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(distTypeName),
    undefined,
    undefined,
    [
      ts.createPropertySignature(
        undefined,
        ts.createStringLiteral(fileInfo.nameSpace),
        undefined,
        ts.createTypeLiteralNode(
          getPropertySignaturesFromSourceFile(
            sourceFile,
            fileInfo,
            utilityTypeName,
            variableDeclarationName,
            constants
          )
        ),
        undefined
      )
    ]
  )
