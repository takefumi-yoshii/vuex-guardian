import { Config, Constants } from './config'
//_______________________________________________________
//
type FileInfo = {
  fileName: string
  filePath: string
  fileDir: string[]
  distDir: string
  distFileName: string
  moduleName: string
  importModulePath: string
  nameSpace: string
}
//_______________________________________________________
//
export { FileInfo, Config, Constants }
