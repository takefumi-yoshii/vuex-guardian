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
var createProgram_1 = require("../createProgram");
var mapFileInfo_1 = require("./mapFileInfo");
var emitShims_1 = require("./emitShims");
var emitModules_1 = require("./emitModules");
//_______________________________________________________
//
exports.emitFiles = function (storeDir, distDir, config, constants) {
    var time = Date.now();
    var logger = time.toString() + ":vuex-guardian build";
    console.time(logger);
    //_________________________
    //
    var baseDir = path.resolve(config.baseDir);
    var program = createProgram_1.createProgram(baseDir);
    var fileInfos = program
        .getRootFileNames()
        .filter(function (fileName) { return fileName.match(storeDir); })
        .map(mapFileInfo_1.mapFileInfo(storeDir, distDir));
    //_________________________
    //
    emitShims_1.emitShims(distDir, fileInfos, constants);
    emitModules_1.emitModules(fileInfos, program, constants);
    //_________________________
    //
    console.timeEnd(logger);
};
