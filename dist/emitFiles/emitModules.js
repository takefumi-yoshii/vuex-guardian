"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createModuleAst_1 = require("../createModuleAst");
var printNode_1 = require("./printNode");
var emitFile_1 = require("./emitFile");
//_______________________________________________________
//
exports.emitModule = function (sourceFile, fileInfo, constants) {
    var fileBody = printNode_1.printNode(createModuleAst_1.createModuleAst(sourceFile, fileInfo, constants));
    emitFile_1.emitFile(fileInfo.distDir, fileInfo.distPath, fileBody);
};
//_______________________________________________________
//
function emitModules(fileInfos, program, constants) {
    fileInfos.map(function (fileInfo) {
        var sourceFile = program.getSourceFile(fileInfo.filePath);
        if (sourceFile) {
            exports.emitModule(sourceFile, fileInfo, constants);
        }
    });
}
exports.emitModules = emitModules;
