import { Constants, FileTree } from '../types'
import { createShimsAst } from '../createShimsAst'
import { printNode } from '../printNode'
import { emitFile } from './emitFile'
// ______________________________________________________
//
export function emitShims(
  distDir: string,
  fileTree: FileTree[],
  constants: Constants
) {
  const ast = createShimsAst(fileTree, constants)
  const fileBody = printNode(ast)
  const fileName = `${distDir}/vuex-shims.ts`
  emitFile(distDir, fileName, fileBody)
}
