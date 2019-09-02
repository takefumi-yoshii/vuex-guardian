"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var createModuleAst_1 = require("../createModuleAst");
var printNode_1 = require("../printNode");
var emitFile_1 = require("./emitFile");
// ______________________________________________________
//
function emitModules(program, config, constants) {
    return function (fileInfo) {
        var dir = path.resolve(config.distDir);
        var distDir = dir + "/" + fileInfo.namespace + "/";
        var fileName = "" + distDir + fileInfo.fileName;
        var sourceFile = program.getSourceFile(fileInfo.filePath);
        if (sourceFile) {
            var ast = createModuleAst_1.createModuleAst(sourceFile, fileInfo, constants);
            var fileBody = printNode_1.printNode(ast);
            emitFile_1.emitFile(distDir, fileName, fileBody);
        }
    };
}
exports.emitModules = emitModules;
