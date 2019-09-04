import * as path from 'path'
import { Config, Constants } from '../types'
import { createProgram } from '../createProgram'
import { mapFileInfo } from './mapFileInfo'
import { emitShims } from './emitShims'
import { emitModule } from './emitModule'
//_______________________________________________________
//
export const emitFiles = async (
  distDir: string,
  storeDir: string,
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
  // parse target source files
  const fileInfos = program
    .getRootFileNames()
    .filter(fileName => fileName.match(storeDir))
    .map(mapFileInfo(storeDir, distDir))
  // emit files
  emitShims(distDir, fileInfos, constants)
  fileInfos.map(fileInfo => {
    const sourceFile = program.getSourceFile(
      fileInfo.filePath
    )
    if (sourceFile) {
      emitModule(sourceFile, fileInfo, constants)
    }
  })
  //_________________________
  //
  console.timeEnd(logger)
}
