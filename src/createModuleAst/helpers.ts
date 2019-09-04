import * as ts from 'typescript'
//_______________________________________________________
//
export function isExpectedIdentifierVariableStatement(
  identifier: string
) {
  return (node: ts.Node) => {
    let res = false
    node.forEachChild(child => {
      if (ts.isVariableDeclarationList(child)) {
        child.forEachChild(child => {
          if (ts.isVariableDeclaration(child)) {
            if (ts.isIdentifier(child.name)) {
              res = child.name.text === identifier
            }
          }
        })
      }
    })
    return res
  }
}

export function getVariableDeclarationFromVariableStatement(
  node: ts.VariableStatement
): ts.VariableDeclaration | null {
  let decl: ts.VariableDeclaration | null = null
  node.forEachChild(child => {
    if (ts.isVariableDeclarationList(child)) {
      child.forEachChild(child => {
        if (ts.isVariableDeclaration(child)) {
          decl = child
        }
      })
    }
  })
  return decl
}

export function getMethodDeclarationNamesFromVariableDeclaration(
  node: ts.VariableDeclaration | null
) {
  const names: string[] = []
  if (!node) return names
  if (!ts.isIdentifier(node.name)) return names
  node.forEachChild(child => {
    if (ts.isObjectLiteralExpression(child)) {
      child.forEachChild(child => {
        if (ts.isMethodDeclaration(child)) {
          if (ts.isIdentifier(child.name)) {
            names.push(child.name.text)
          }
        }
      })
    }
  })
  return names
}
