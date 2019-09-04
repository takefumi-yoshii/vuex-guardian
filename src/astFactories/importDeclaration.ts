import * as ts from 'typescript'
//_______________________________________________________
//
export const importDeclaration = (literal: string) =>
  ts.createImportDeclaration(
    undefined,
    undefined,
    undefined,
    ts.createStringLiteral(literal)
  )
