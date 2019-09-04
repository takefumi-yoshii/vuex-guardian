"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createShimsAst_1 = require("../createShimsAst");
var printNode_1 = require("./printNode");
var emitFile_1 = require("./emitFile");
// ______________________________________________________
//
exports.emitShims = function (distDir, fileInfos, constants) {
    var ast = createShimsAst_1.createShimsAst(fileInfos, constants);
    var fileBody = printNode_1.printNode(ast);
    var distPath = distDir + "/vuex-shims.ts";
    emitFile_1.emitFile(distDir, distPath, fileBody);
};
