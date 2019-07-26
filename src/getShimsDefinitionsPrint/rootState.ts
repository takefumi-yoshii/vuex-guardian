import * as ts from "typescript";
import flatten from "lodash.flatten";
import { FileTree, Constants } from "../types";
//_______________________________________________________
//
function getSignature(
  fileTree: FileTree,
  wrapUtilityTypeName: string,
  variableDeclarationName: string,
  constants: Constants
) {
  return ts.createTypeReferenceNode(ts.createIdentifier(wrapUtilityTypeName), [
    ts.createIndexedAccessTypeNode(
      ts.createIndexedAccessTypeNode(
        ts.createTypeReferenceNode(
          ts.createIdentifier(constants.MODULES),
          undefined
        ),
        ts.createLiteralTypeNode(ts.createStringLiteral(fileTree.namespace))
      ),
      ts.createLiteralTypeNode(ts.createStringLiteral(variableDeclarationName))
    )
  ]);
}
//_______________________________________________________
//
export default function(fileTree: FileTree[], constants: Constants) {
  const recurse = (tree: FileTree[]) => {
    return tree
      .map(definition => {
        let node: ts.TypeElement[] = [];
        let name = definition.fileName;
        const children = definition.children;
        if (children) {
          node.push(
            ts.createPropertySignature(
              undefined,
              ts.createIdentifier(name),
              undefined,
              ts.createIntersectionTypeNode([
                getSignature(
                  children[0],
                  constants.RETURN_TYPE,
                  constants.STATE,
                  constants
                ),
                ts.createTypeLiteralNode(flatten(recurse(children)))
              ]),
              undefined
            )
          );
        }
        return node;
      })
      .filter((element): element is ts.TypeElement[] => element !== undefined);
  };
  if (fileTree.filter(tree => tree.fileName === "index.ts").length) {
    return [
      ts.createTypeAliasDeclaration(
        undefined,
        undefined,
        ts.createIdentifier(constants.ROOT_STATE),
        undefined,
        ts.createIntersectionTypeNode([
          ts.createTypeLiteralNode(flatten(recurse(fileTree))),
          ts.createTypeReferenceNode(
            ts.createIdentifier(constants.RETURN_TYPE),
            [
              ts.createIndexedAccessTypeNode(
                ts.createIndexedAccessTypeNode(
                  ts.createTypeReferenceNode(
                    ts.createIdentifier(constants.MODULES),
                    undefined
                  ),
                  ts.createLiteralTypeNode(ts.createStringLiteral(""))
                ),
                ts.createLiteralTypeNode(
                  ts.createStringLiteral(constants.STATE)
                )
              )
            ]
          )
        ])
      )
    ];
  }
  return [
    ts.createTypeAliasDeclaration(
      undefined,
      undefined,
      ts.createIdentifier(constants.ROOT_STATE),
      undefined,
      ts.createTypeLiteralNode(flatten(recurse(fileTree)))
    )
  ];
}
