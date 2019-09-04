import { FileInfo } from '../types'
// ______________________________________________________
//
export function mapFileInfo(src: string, dist: string) {
  return (filePath: string): FileInfo => {
    const fileTreeKeys = filePath
      .replace(`${src}/`, '')
      .split('/')
    const fileName = fileTreeKeys[fileTreeKeys.length - 1]
    fileTreeKeys.pop()

    const nameSpace = fileTreeKeys.join('/')
    const moduleName =
      fileName === 'index.ts'
        ? fileTreeKeys[fileTreeKeys.length - 1]
        : fileName.replace('.ts', '')
    const importModulePath = filePath.replace('.ts', '')
    const distDir = `${dist}/${nameSpace}`
    const distPath = `${distDir}/${fileName}`

    return {
      fileName,
      filePath,
      fileTreeKeys,
      nameSpace,
      moduleName,
      importModulePath,
      distDir,
      distPath
    }
  }
}
