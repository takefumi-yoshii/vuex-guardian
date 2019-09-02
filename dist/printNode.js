"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = __importStar(require("typescript"));
// ______________________________________________________
//
var printer = ts.createPrinter();
// ______________________________________________________
//
function printNode(nodeArray) {
    return printer.printList(ts.ListFormat.MultiLine, ts.createNodeArray(nodeArray), ts.createSourceFile('', '', ts.ScriptTarget.ES2015));
}
exports.printNode = printNode;
