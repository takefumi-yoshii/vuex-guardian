import { Config, Constants } from './config'
//_______________________________________________________
//
type FileInfo = {
  fileName: string
  filePath: string
  namespace: string
  moduleName: string
}
type FileTree = FileInfo & {
  children?: FileTree[]
}
//_______________________________________________________
//
export { FileInfo, FileTree, Config, Constants }
