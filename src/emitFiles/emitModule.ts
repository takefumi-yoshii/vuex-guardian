import * as ts from 'typescript'
import { Constants, FileInfo } from '../types'
import { createModuleAst } from '../createModuleAst'
import { printNode } from '../printNode'
import { emitFile } from './emitFile'
// ______________________________________________________
//
export const emitModule = (
  sourceFile: ts.SourceFile,
  fileInfo: FileInfo,
  constants: Constants
) => {
  const ast = createModuleAst(
    sourceFile,
    fileInfo,
    constants
  )
  const fileBody = printNode(ast)
  emitFile(
    fileInfo.distDir,
    fileInfo.distFileName,
    fileBody
  )
}
