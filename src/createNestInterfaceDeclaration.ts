import * as ts from "typescript";
import { TypeFile, Constants } from "./types";
//_______________________________________________________
//
function createPropertySignatures(
  typeFile: TypeFile,
  wrapUtilityTypeName: string,
  variableDeclarationName: string,
  constants: Constants
) {
  return [
    ts.createPropertySignature(
      undefined,
      ts.createStringLiteral(typeFile.namespace),
      undefined,
      ts.createTypeReferenceNode(ts.createIdentifier(wrapUtilityTypeName), [
        ts.createIndexedAccessTypeNode(
          ts.createIndexedAccessTypeNode(
            ts.createTypeReferenceNode(
              ts.createIdentifier(constants.MODULES),
              undefined
            ),
            ts.createLiteralTypeNode(ts.createStringLiteral(typeFile.namespace))
          ),
          ts.createLiteralTypeNode(
            ts.createStringLiteral(variableDeclarationName)
          )
        )
      ]),
      undefined
    )
  ];
}
//_______________________________________________________
//
export default (
  typeFile: TypeFile,
  distTypeName: string,
  wrapUtilityTypeName: string,
  variableDeclarationName: string,
  constants: Constants
) =>
  ts.createInterfaceDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(distTypeName),
    undefined,
    undefined,
    createPropertySignatures(
      typeFile,
      wrapUtilityTypeName,
      variableDeclarationName,
      constants
    )
  );
