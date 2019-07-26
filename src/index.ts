import * as ts from "typescript";
import * as fs from "fs-extra";
import * as path from "path";
import Watchpack from "watchpack";
import { Config, Constants, FileTree } from "./types";
import { config as defaultConfig } from "./config";
import getSourceFiles from "./getSourceFiles";
import getShimsDefinitionsPrint from "./getShimsDefinitionsPrint";
import getModuleDefinitionsPrint from "./getModuleDefinitionsPrint";
import writefile from "./writefile";
//_______________________________________________________
//
function cleanUp(distDir: string) {
  const isExist = fs.existsSync(distDir);
  if (!isExist) {
    fs.mkdirsSync(distDir);
  } else {
    fs.removeSync(distDir);
    fs.mkdirsSync(distDir);
  }
}
function writeShimsDefinitions(
  distDir: string,
  printer: ts.Printer,
  emptyFile: ts.SourceFile,
  fileTree: FileTree[],
  constants: Constants
) {
  writefile(
    distDir,
    "vuex-shims.ts",
    getShimsDefinitionsPrint(printer, emptyFile, fileTree, constants)
  );
}
async function writeModuleDefinitions(
  distDir: string,
  storeDir: string,
  printer: ts.Printer,
  emptyFile: ts.SourceFile,
  config: Config,
  constants: Constants
) {
  const time = Date.now();
  const logger = `${time.toString()}:vuex-guardian build`;
  console.time(logger);

  const [typeFiles, fileTree] = await getSourceFiles(storeDir, "index.ts");
  const files = typeFiles.map(file => file.filePath);
  const program = ts.createProgram(files, {});
  writeShimsDefinitions(distDir, printer, emptyFile, fileTree, constants);
  typeFiles.map(typeFile => {
    writefile(
      path.resolve(config.distDir) + "/" + typeFile.namespace + "/",
      typeFile.fileName,
      getModuleDefinitionsPrint(
        program,
        emptyFile,
        printer,
        typeFile,
        constants
      )
    );
  });
  console.timeEnd(logger);
}
//_______________________________________________________
//
export function run(config: Config) {
  const storeDir = path.resolve(config.storeDir);
  const distDir = path.resolve(config.distDir);
  const wp = new Watchpack({});
  const printer = ts.createPrinter();
  const emptyFile = ts.createSourceFile("", "", ts.ScriptTarget.ES2015);
  const constants = {
    ...defaultConfig.constants,
    ...config.constants
  };

  cleanUp(distDir);

  if (config.build) {
    writeModuleDefinitions(
      distDir,
      storeDir,
      printer,
      emptyFile,
      config,
      constants
    );
  } else {
    wp.watch([], [storeDir]);
    wp.on("change", filePath => {
      (async () => {
        const isExist = fs.existsSync(filePath);
        if (!isExist) {
          const cwd = "/Users/takefumi.yoshii/ghe/vuex-guardian-example/";
          const storeDir = path.resolve(config.storeDir);
          const distTarget = path.resolve(
            cwd + config.distDir + filePath.replace(storeDir, "")
          );
          fs.removeSync(distTarget);
        }
        await writeModuleDefinitions(
          distDir,
          storeDir,
          printer,
          emptyFile,
          config,
          constants
        );
      })();
    });
  }
}

if (process.env.CLI_DEV) {
  run(defaultConfig);
}
