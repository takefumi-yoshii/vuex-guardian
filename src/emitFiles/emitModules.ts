import * as ts from 'typescript'
import { FileInfo, Constants } from '../types'
import { createModuleAst } from '../createModuleAst'
import { printNode } from './printNode'
import { emitFile } from './emitFile'
//_______________________________________________________
//
export const emitModule = (
  sourceFile: ts.SourceFile,
  fileInfo: FileInfo,
  constants: Constants
) => {
  const fileBody = printNode(
    createModuleAst(sourceFile, fileInfo, constants)
  )
  emitFile(fileInfo.distDir, fileInfo.distPath, fileBody)
}
//_______________________________________________________
//
export function emitModules(
  fileInfos: FileInfo[],
  program: ts.Program,
  constants: Constants
) {
  fileInfos.map(fileInfo => {
    const sourceFile = program.getSourceFile(
      fileInfo.filePath
    )
    if (sourceFile) {
      emitModule(sourceFile, fileInfo, constants)
    }
  })
}
