"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createModuleAst_1 = require("../createModuleAst");
var printNode_1 = require("../printNode");
var emitFile_1 = require("./emitFile");
// ______________________________________________________
//
exports.emitModule = function (sourceFile, fileInfo, constants) {
    var ast = createModuleAst_1.createModuleAst(sourceFile, fileInfo, constants);
    var fileBody = printNode_1.printNode(ast);
    emitFile_1.emitFile(fileInfo.distDir, fileInfo.distFileName, fileBody);
};
