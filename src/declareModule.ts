import * as ts from "typescript";
//_______________________________________________________
//
export default (moduleName: string, statements: (ts.Statement)[]) =>
  ts.createModuleDeclaration(
    undefined,
    [ts.createModifier(ts.SyntaxKind.DeclareKeyword)],
    ts.createStringLiteral(moduleName),
    ts.createModuleBlock(statements),
    ts.NodeFlags.None
  );
