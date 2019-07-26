import { Config, Constants } from "./config";
//_______________________________________________________
//
type TypeFile = {
  fileName: string;
  filePath: string;
  namespace: string;
  moduleName: string;
};
type FileTree = TypeFile & {
  children?: FileTree[];
};
//_______________________________________________________
//
export { TypeFile, FileTree, Config, Constants };
