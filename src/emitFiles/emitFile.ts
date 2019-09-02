import * as fs from 'fs-extra'
// ______________________________________________________
//
export function emitFile(
  distDir: string,
  fileName: string,
  fileBody: string
) {
  if (!fs.existsSync(distDir)) {
    fs.mkdirsSync(distDir)
  }
  fs.writeFileSync(fileName, fileBody)
}
