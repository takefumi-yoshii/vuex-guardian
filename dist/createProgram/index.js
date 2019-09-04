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
var createConfigFileHost_1 = require("./createConfigFileHost");
// ______________________________________________________
//
function createProgram(searchPath, configName) {
    if (configName === void 0) { configName = 'tsconfig.json'; }
    var configPath = ts.findConfigFile(searchPath, ts.sys.fileExists, configName);
    if (!configPath) {
        throw new Error("Could not find a valid 'tsconfig.json'.");
    }
    var parsedCommandLine = ts.getParsedCommandLineOfConfigFile(configPath, {}, createConfigFileHost_1.createConfigFileHost());
    if (!parsedCommandLine) {
        throw new Error('invalid parsedCommandLine.');
    }
    if (parsedCommandLine.errors.length) {
        throw new Error('parsedCommandLine has errors.');
    }
    return ts.createProgram({
        rootNames: parsedCommandLine.fileNames,
        options: parsedCommandLine.options
    });
}
exports.createProgram = createProgram;
