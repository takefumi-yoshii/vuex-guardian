import { Constants, FileInfo } from '../types'
import { createShimsAst } from '../createShimsAst'
import { printNode } from '../printNode'
import { emitFile } from './emitFile'
// ______________________________________________________
//
export const emitShims = (
  distDir: string,
  fileInfos: FileInfo[],
  constants: Constants
) => {
  const ast = createShimsAst(fileInfos, constants)
  const fileBody = printNode(ast)
  const fileName = `${distDir}/vuex-shims.ts`
  emitFile(distDir, fileName, fileBody)
}
