import { Constants, FileInfo } from '../types'
import { createShimsAst } from '../createShimsAst'
import { printNode } from './printNode'
import { emitFile } from './emitFile'
// ______________________________________________________
//
export const emitShims = (
  distDir: string,
  fileInfos: FileInfo[],
  constants: Constants
) => {
  const fileBody = printNode(
    createShimsAst(fileInfos, constants)
  )
  const distPath = `${distDir}/vuex-shims.ts`
  emitFile(distDir, distPath, fileBody)
}
