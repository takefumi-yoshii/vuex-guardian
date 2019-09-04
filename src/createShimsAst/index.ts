import * as ts from 'typescript'
import { Constants, FileInfo } from '../types'
import { argument2 } from './argument2'
import { strictCommit } from './strictCommit'
import { strictDispatch } from './strictDispatch'
import { strictContext } from './strictContext'
import { strictStore } from './strictStore'
import { rootState } from './rootState'
import { rootContext } from './rootContext'
//_______________________________________________________
//
export const createShimsAst = (
  fileInfos: FileInfo[],
  constants: Constants
) => [
  ts.createImportDeclaration(
    undefined,
    undefined,
    undefined,
    ts.createStringLiteral(constants.VUEX)
  ),
  ts.createModuleDeclaration(
    undefined,
    [ts.createModifier(ts.SyntaxKind.DeclareKeyword)],
    ts.createStringLiteral(constants.VUEX),
    ts.createModuleBlock([
      ...argument2(constants),
      ...strictCommit(constants),
      ...strictDispatch(constants),
      ...strictContext(constants),
      ...strictStore(constants),
      ...rootState(fileInfos, constants),
      ...rootContext(constants)
    ])
  )
]
