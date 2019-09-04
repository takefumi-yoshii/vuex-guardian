import * as ts from 'typescript'
import { FileInfo, Constants } from '../types'
//_______________________________________________________
//
export const createInterfaceForModules = (
  fileInfo: FileInfo,
  constants: Constants
) =>
  ts.createInterfaceDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(constants.MODULES),
    undefined,
    undefined,
    [
      ts.createPropertySignature(
        undefined,
        ts.createStringLiteral(fileInfo.nameSpace),
        undefined,
        ts.createTypeQueryNode(
          ts.createIdentifier(constants.MODULE)
        ),
        undefined
      )
    ]
  )
