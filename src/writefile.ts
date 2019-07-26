import * as fs from "fs";
//_______________________________________________________
//
export default (dir: string, fileName: string, code: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(`${dir}/${fileName}`, code);
};
