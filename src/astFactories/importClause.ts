import * as ts from 'typescript'
//_______________________________________________________
//
export const importClause = (name: string, from: string) =>
  ts.createImportDeclaration(
    undefined,
    undefined,
    ts.createImportClause(
      undefined,
      ts.createNamespaceImport(ts.createIdentifier(name))
    ),
    ts.createStringLiteral(from)
  )
