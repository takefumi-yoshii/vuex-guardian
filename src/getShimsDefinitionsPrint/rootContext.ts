import * as ts from "typescript";
import { Constants } from "../types";
//_______________________________________________________
//
export default (constants: Constants) => [
  ts.createTypeAliasDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(constants.ROOT_CONTEXT),
    undefined,
    ts.createTypeReferenceNode(ts.createIdentifier(constants.STRICT_CONTEXT), [
      ts.createTypeReferenceNode(
        ts.createIdentifier(constants.ROOT_STATE),
        undefined
      ),
      ts.createTypeReferenceNode(
        ts.createIdentifier(constants.ROOT_GETTERS),
        undefined
      ),
      ts.createTypeReferenceNode(
        ts.createIdentifier(constants.MUTATION_TYPES),
        undefined
      ),
      ts.createTypeReferenceNode(
        ts.createIdentifier(constants.ACTION_TYPES),
        undefined
      )
    ])
  )
];
