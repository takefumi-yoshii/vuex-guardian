import * as ts from "typescript";
import flatten from "lodash.flatten";
import { TypeFile } from "./types";
import {
  isExpectedIdentifierVariableStatement,
  getVariableDeclarationFromVariableStatement,
  getMethodDeclarationNamesFromVariableDeclaration
} from "./helpers";
//_______________________________________________________
//
function getSignature(
  typeFile: TypeFile,
  identifier: string,
  moduleAliasTypeName: string
) {
  const namespace = typeFile.namespace === "" ? "" : `${typeFile.namespace}/`;
  return ts.createPropertySignature(
    undefined,
    ts.createStringLiteral(`${namespace}${identifier}`),
    undefined,
    ts.createIndexedAccessTypeNode(
      ts.createIndexedAccessTypeNode(
        ts.createTypeReferenceNode(
          ts.createIdentifier(moduleAliasTypeName),
          undefined
        ),
        ts.createLiteralTypeNode(ts.createStringLiteral(typeFile.namespace))
      ),
      ts.createLiteralTypeNode(ts.createStringLiteral(identifier))
    ),
    undefined
  );
}
function createPropertySignatures(
  node: ts.VariableDeclaration | null,
  typeFile: TypeFile,
  moduleAliasTypeName: string
) {
  const identifiers = getMethodDeclarationNamesFromVariableDeclaration(node);
  return identifiers.map(identifier =>
    getSignature(typeFile, identifier, moduleAliasTypeName)
  );
}
function createPropertySignaturesFromSourceFile(
  program: ts.Program,
  typeFile: TypeFile,
  moduleAliasTypeName: string,
  variableDeclarationName: string
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
        createPropertySignatures(node, typeFile, moduleAliasTypeName)
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
  moduleAliasTypeName: string,
  variableDeclarationName: string
) =>
  ts.createInterfaceDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(distTypeName),
    undefined,
    undefined,
    createPropertySignaturesFromSourceFile(
      program,
      typeFile,
      moduleAliasTypeName,
      variableDeclarationName
    )!
  );
