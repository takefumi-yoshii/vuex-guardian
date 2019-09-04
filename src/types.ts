import { Config, Constants } from './config'
//_______________________________________________________
//
type FileInfo = {
  fileName: string
  filePath: string
  fileDir: string[]
  nameSpace: string
  moduleName: string
  importModulePath: string
  distDir: string
  distPath: string
}
//_______________________________________________________
//
export { FileInfo, Config, Constants }
