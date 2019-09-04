import { FileInfo } from '../types'
// ______________________________________________________
//
export function mapFileInfo(src: string, dist: string) {
  return (filePath: string): FileInfo => {
    const fileDir = filePath
      .replace(`${src}/`, '')
      .split('/')
    const fileName = fileDir[fileDir.length - 1]
    fileDir.pop()
    const nameSpace = fileDir.join('/')
    const distDir = `${dist}/${nameSpace}`
    const distFileName = `${distDir}/${fileName}`
    const moduleName =
      fileName === 'index.ts'
        ? fileDir[fileDir.length - 1]
        : fileName.replace('.ts', '')
    return {
      fileName,
      filePath,
      fileDir,
      distDir,
      distFileName,
      moduleName,
      importModulePath: filePath.replace('.ts', ''),
      nameSpace
    }
  }
}
