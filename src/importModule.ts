import * as ts from "typescript";
import { TypeFile, Constants } from "./types";
//_______________________________________________________
//
function importModule(name: string, from: string) {
  return ts.createImportDeclaration(
    undefined,
    undefined,
    ts.createImportClause(
      undefined,
      ts.createNamespaceImport(ts.createIdentifier(name))
    ),
    ts.createStringLiteral(from)
  );
}
//_______________________________________________________
//
export default function(typeFile: TypeFile, constants: Constants) {
  return importModule(constants.MODULE, typeFile.filePath.slice(0, -3));
}
