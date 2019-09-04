import * as ts from 'typescript'
import { FileInfo, Constants } from '../types'
//_______________________________________________________
//
export const createInterfaceForLocalState = (
  fileInfo: FileInfo,
  constants: Constants
) =>
  ts.createInterfaceDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(constants.LOCAL_STATE),
    undefined,
    undefined,
    [
      ts.createPropertySignature(
        undefined,
        ts.createStringLiteral(fileInfo.nameSpace),
        undefined,
        ts.createTypeReferenceNode(
          ts.createIdentifier(constants.RETURN_TYPE),
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
                ts.createStringLiteral(constants.STATE)
              )
            )
          ]
        ),
        undefined
      )
    ]
  )
