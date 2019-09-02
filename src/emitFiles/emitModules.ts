import * as ts from 'typescript'
import * as path from 'path'
import { Config, Constants, FileInfo } from '../types'
import { createModuleAst } from '../createModuleAst'
import { printNode } from '../printNode'
import { emitFile } from './emitFile'
// ______________________________________________________
//
export function emitModules(
  program: ts.Program,
  config: Config,
  constants: Constants
) {
  return (fileInfo: FileInfo) => {
    const dir = path.resolve(config.distDir)
    const distDir = `${dir}/${fileInfo.namespace}/`
    const fileName = `${distDir}${fileInfo.fileName}`
    const sourceFile = program.getSourceFile(fileInfo.filePath)
    if (sourceFile) {
      const ast = createModuleAst(
        sourceFile,
        fileInfo,
        constants
      )
      const fileBody = printNode(ast)
      emitFile(distDir, fileName, fileBody)
    }
  }
}
