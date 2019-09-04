import { Constants, FileInfo } from '../types'
import { importByLiteral } from '../astFactories/importByLiteral'
import { declareModule } from '../astFactories/declareModule'
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
  importByLiteral(constants.VUEX),
  declareModule(constants.VUEX, [
    argument2(constants),
    ...strictCommit(constants),
    ...strictDispatch(constants),
    strictContext(constants),
    strictStore(constants),
    rootState(fileInfos, constants),
    rootContext(constants)
  ])
]
