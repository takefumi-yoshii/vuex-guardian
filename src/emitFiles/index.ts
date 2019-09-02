import * as ts from 'typescript'
import { Config, Constants } from '../types'
import { getSourceFiles } from './getSourceFiles'
import { emitShims } from './emitShims'
import { emitModules } from './emitModules'
//_______________________________________________________
//
export async function emitFiles(
  distDir: string,
  storeDir: string,
  config: Config,
  constants: Constants
) {
  const time = Date.now()
  const logger = `${time.toString()}:vuex-guardian build`
  console.time(logger)
  const [fileInfos, fileTree] = await getSourceFiles(
    storeDir,
    'index.ts'
  )
  const files = fileInfos.map(file => file.filePath)
  const program = ts.createProgram(files, {})
  emitShims(distDir, fileTree, constants)
  fileInfos.map(emitModules(program, config, constants))
  console.timeEnd(logger)
}
