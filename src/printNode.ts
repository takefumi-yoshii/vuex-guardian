import * as ts from 'typescript'
// ______________________________________________________
//
const printer = ts.createPrinter()
// ______________________________________________________
//
export function printNode(nodeArray: ts.Node[]) {
  return printer.printList(
    ts.ListFormat.MultiLine,
    ts.createNodeArray(nodeArray),
    ts.createSourceFile('', '', ts.ScriptTarget.ES2015)
  )
}
