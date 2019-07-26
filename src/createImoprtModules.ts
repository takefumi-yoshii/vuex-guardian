import * as ts from "typescript";
import { TypeFile, Constants } from "./types";
//_______________________________________________________
//
function createPropertySignatures(typeFile: TypeFile, constants: Constants) {
  return [
    ts.createPropertySignature(
      undefined,
      ts.createStringLiteral(typeFile.namespace),
      undefined,
      ts.createTypeQueryNode(ts.createIdentifier(constants.MODULE)),
      undefined
    )
  ];
}
//_______________________________________________________
//
export default (typeFile: TypeFile, constants: Constants) =>
  ts.createInterfaceDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(constants.MODULES),
    undefined,
    undefined,
    createPropertySignatures(typeFile, constants)
  );
