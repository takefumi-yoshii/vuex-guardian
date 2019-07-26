import * as ts from "typescript";
import flatten from "lodash.flatten";
import { TypeFile, Constants } from "./types";
import {
  isExpectedIdentifierVariableStatement,
  getVariableDeclarationFromVariableStatement,
  getMethodDeclarationNamesFromVariableDeclaration
} from "./helpers";
//_______________________________________________________
//
function getSignature(
  typeFile: TypeFile,
  wrapUtilityTypeName: string,
  variableDeclarationName: string,
  identifier: string,
  constants: Constants
) {
  return ts.createPropertySignature(
    undefined,
    ts.createIdentifier(identifier),
    undefined,
    ts.createTypeReferenceNode(ts.createIdentifier(wrapUtilityTypeName), [
      ts.createIndexedAccessTypeNode(
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
        ),
        ts.createLiteralTypeNode(ts.createStringLiteral(identifier))
      )
    ]),
    undefined
  );
}
function createPropertySignatures(
  node: ts.VariableDeclaration | null,
  typeFile: TypeFile,
  wrapUtilityTypeName: string,
  variableDeclarationName: string,
  constants: Constants
) {
  const identifiers = getMethodDeclarationNamesFromVariableDeclaration(node);
  return identifiers.map(identifier =>
    getSignature(
      typeFile,
      wrapUtilityTypeName,
      variableDeclarationName,
      identifier,
      constants
    )
  );
}
function createPropertySignaturesFromSourceFile(
  program: ts.Program,
  typeFile: TypeFile,
  wrapUtilityTypeName: string,
  variableDeclarationName: string,
  constants: Constants
) {
  const sourceFile = program.getSourceFile(typeFile.filePath);
  if (!sourceFile) return;
  const typeDefinitions = sourceFile.getChildAt(0);
  return flatten(
    typeDefinitions
      .getChildren()
      .filter((node): node is ts.VariableStatement =>
        ts.isVariableStatement(node)
      )
      .filter(node =>
        isExpectedIdentifierVariableStatement(node, variableDeclarationName)
      )
      .map(node => getVariableDeclarationFromVariableStatement(node))
      .map(node =>
        createPropertySignatures(
          node,
          typeFile,
          wrapUtilityTypeName,
          variableDeclarationName,
          constants
        )
      )
      .filter((node): node is ts.PropertySignature[] => node !== undefined)
  );
}
//_______________________________________________________
//
export default (
  program: ts.Program,
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
    [
      ts.createPropertySignature(
        undefined,
        ts.createStringLiteral(typeFile.namespace),
        undefined,
        ts.createTypeLiteralNode(
          createPropertySignaturesFromSourceFile(
            program,
            typeFile,
            wrapUtilityTypeName,
            variableDeclarationName,
            constants
          )
        ),
        undefined
      )
    ]
  );
