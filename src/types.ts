import { Config, Constants } from './config'
//_______________________________________________________
//
type FileInfo = {
  fileName: string // 'index.ts'
  filePath: string // '~/store/path/to/module/index.ts'
  fileImportPath: string // '~/store/path/to/module/index'
  fileTreeKeys: string[] // ['path', 'to', 'module']
  nameSpace: string // 'path/to/module'
  moduleName: string // 'module'
  distDir: string // '~/dist/path/to/module'
  distPath: string // '~/dist/path/to/module/index.ts'
}
//_______________________________________________________
//
export { FileInfo, Config, Constants }
