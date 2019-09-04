import { FileInfo } from '../types'
// ______________________________________________________
//
export function mapFileInfo(src: string, dist: string) {
  return (filePath: string): FileInfo => {
    const fileTreeKeys = filePath
      .replace(`${src}/`, '')
      .split('/')
    const fileName = fileTreeKeys[fileTreeKeys.length - 1]
    const fileImportPath = filePath.replace('.ts', '')
    fileTreeKeys.pop()

    const nameSpace = fileTreeKeys.join('/')
    const moduleName =
      fileName === 'index.ts'
        ? fileTreeKeys[fileTreeKeys.length - 1]
        : fileName.replace('.ts', '')

    const distDir = `${dist}/${nameSpace}`
    const distPath = `${distDir}/${fileName}`

    return {
      fileName,
      filePath,
      fileImportPath,
      fileTreeKeys,
      nameSpace,
      moduleName,
      distDir,
      distPath
    }
  }
}
