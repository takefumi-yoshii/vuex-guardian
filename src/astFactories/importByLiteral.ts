import * as ts from 'typescript'
//_______________________________________________________
//
export const importByLiteral = (literal: string) =>
  ts.createImportDeclaration(
    undefined,
    undefined,
    undefined,
    ts.createStringLiteral(literal)
  )
