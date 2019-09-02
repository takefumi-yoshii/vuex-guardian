"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createShimsAst_1 = require("../createShimsAst");
var printNode_1 = require("../printNode");
var emitFile_1 = require("./emitFile");
// ______________________________________________________
//
function emitShims(distDir, fileTree, constants) {
    var ast = createShimsAst_1.createShimsAst(fileTree, constants);
    var fileBody = printNode_1.printNode(ast);
    var fileName = distDir + "/vuex-shims.ts";
    emitFile_1.emitFile(distDir, fileName, fileBody);
}
exports.emitShims = emitShims;
