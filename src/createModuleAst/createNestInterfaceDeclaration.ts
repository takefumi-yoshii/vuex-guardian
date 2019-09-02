import * as ts from 'typescript'
import { FileInfo, Constants } from '../types'
//_______________________________________________________
//
export const createNestInterfaceDeclaration = (
  fileInfo: FileInfo,
  distTypeName: string,
  wrapUtilityTypeName: string,
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
        ts.createStringLiteral(fileInfo.namespace),
        undefined,
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
                  ts.createStringLiteral(fileInfo.namespace)
                )
              ),
              ts.createLiteralTypeNode(
                ts.createStringLiteral(
                  variableDeclarationName
                )
              )
            )
          ]
        ),
        undefined
      )
    ]
  )
