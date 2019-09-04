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
    const moduleName =
      fileName === 'index.ts'
        ? fileDir[fileDir.length - 1]
        : fileName.replace('.ts', '')
    const importModulePath = filePath.replace('.ts', '')
    const distDir = `${dist}/${nameSpace}`
    const distPath = `${distDir}/${fileName}`

    return {
      fileName,
      filePath,
      fileDir,
      nameSpace,
      moduleName,
      importModulePath,
      distDir,
      distPath
    }
  }
}
