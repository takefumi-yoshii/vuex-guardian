"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs-extra"));
var path = __importStar(require("path"));
var watchpack_1 = __importDefault(require("watchpack"));
var config_1 = require("./config");
var emitFiles_1 = require("./emitFiles");
//_______________________________________________________
//
function run(config) {
    var storeDir = path.resolve(config.storeDir);
    var distDir = path.resolve(config.distDir);
    var constants = __assign({}, config_1.config.constants, config.constants);
    fs.removeSync(distDir);
    function onChange(filePath) {
        if (!fs.existsSync(filePath)) {
            fs.removeSync("" + distDir + filePath.replace(storeDir, ''));
        }
        emitFiles_1.emitFiles(storeDir, distDir, config, constants);
    }
    if (config.build) {
        emitFiles_1.emitFiles(storeDir, distDir, config, constants);
    }
    else {
        var wp = new watchpack_1.default({});
        wp.watch([], [storeDir]);
        wp.on('change', onChange);
    }
}
exports.run = run;
