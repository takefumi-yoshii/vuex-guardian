import * as ts from "typescript";
import { TypeFile, Constants } from "./types";
//_______________________________________________________
//
function createIndexedAccessTypeNodes(
  typeFile: TypeFile,
  constants: Constants
) {
  return [
    ts.createIndexedAccessTypeNode(
      ts.createTypeReferenceNode(
        ts.createIdentifier(constants.LOCAL_STATE),
        undefined
      ),
      ts.createLiteralTypeNode(ts.createStringLiteral(typeFile.namespace))
    ),
    ts.createIndexedAccessTypeNode(
      ts.createTypeReferenceNode(
        ts.createIdentifier(constants.LOCAL_GETTERS),
        undefined
      ),
      ts.createLiteralTypeNode(ts.createStringLiteral(typeFile.namespace))
    ),
    ts.createIndexedAccessTypeNode(
      ts.createTypeReferenceNode(
        ts.createIdentifier(constants.LOCAL_MUTATION_TYPES),
        undefined
      ),
      ts.createLiteralTypeNode(ts.createStringLiteral(typeFile.namespace))
    ),
    ts.createIndexedAccessTypeNode(
      ts.createTypeReferenceNode(
        ts.createIdentifier(constants.LOCAL_ACTION_TYPES),
        undefined
      ),
      ts.createLiteralTypeNode(ts.createStringLiteral(typeFile.namespace))
    )
  ];
}
function createPropertySignatures(typeFile: TypeFile, constants: Constants) {
  return [
    ts.createPropertySignature(
      undefined,
      ts.createStringLiteral(typeFile.namespace),
      undefined,
      ts.createTypeReferenceNode(
        ts.createIdentifier(constants.STRICT_CONTEXT),
        createIndexedAccessTypeNodes(typeFile, constants)
      ),
      undefined
    )
  ];
}
//_______________________________________________________
//
export default (
  typeFile: TypeFile,
  distTypeName: string,
  constants: Constants
) =>
  ts.createInterfaceDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(distTypeName),
    undefined,
    undefined,
    createPropertySignatures(typeFile, constants)
  );
