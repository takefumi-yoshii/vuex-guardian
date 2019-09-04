import * as path from 'path'
import { Config, Constants } from '../types'
import { createProgram } from '../createProgram'
import { mapFileInfo } from './mapFileInfo'
import { emitShims } from './emitShims'
import { emitModules } from './emitModules'
//_______________________________________________________
//
export const emitFiles = (
  storeDir: string,
  distDir: string,
  config: Config,
  constants: Constants
) => {
  const time = Date.now()
  const logger = `${time.toString()}:vuex-guardian build`
  console.time(logger)
  //_________________________
  //
  const baseDir = path.resolve(config.baseDir)
  const program = createProgram(baseDir)
  const fileInfos = program
    .getRootFileNames()
    .filter(fileName => fileName.match(storeDir))
    .map(mapFileInfo(storeDir, distDir))
  //_________________________
  //
  emitShims(distDir, fileInfos, constants)
  emitModules(fileInfos, program, constants)
  //_________________________
  //
  console.timeEnd(logger)
}
