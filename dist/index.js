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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var ts = __importStar(require("typescript"));
var fs = __importStar(require("fs-extra"));
var path = __importStar(require("path"));
var watchpack_1 = __importDefault(require("watchpack"));
var config_1 = require("./config");
var getSourceFiles_1 = __importDefault(require("./getSourceFiles"));
var getShimsDefinitionsPrint_1 = __importDefault(require("./getShimsDefinitionsPrint"));
var getModuleDefinitionsPrint_1 = __importDefault(require("./getModuleDefinitionsPrint"));
var writefile_1 = __importDefault(require("./writefile"));
//_______________________________________________________
//
function cleanUp(distDir) {
    var isExist = fs.existsSync(distDir);
    if (!isExist) {
        fs.mkdirsSync(distDir);
    }
    else {
        fs.removeSync(distDir);
        fs.mkdirsSync(distDir);
    }
}
function writeShimsDefinitions(distDir, printer, emptyFile, fileTree, constants) {
    writefile_1.default(distDir, "vuex-shims.ts", getShimsDefinitionsPrint_1.default(printer, emptyFile, fileTree, constants));
}
function writeModuleDefinitions(distDir, storeDir, printer, emptyFile, config, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var time, logger, _a, typeFiles, fileTree, files, program;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    time = Date.now();
                    logger = time.toString() + ":vuex-guardian build";
                    console.time(logger);
                    return [4 /*yield*/, getSourceFiles_1.default(storeDir, "index.ts")];
                case 1:
                    _a = _b.sent(), typeFiles = _a[0], fileTree = _a[1];
                    files = typeFiles.map(function (file) { return file.filePath; });
                    program = ts.createProgram(files, {});
                    writeShimsDefinitions(distDir, printer, emptyFile, fileTree, constants);
                    typeFiles.map(function (typeFile) {
                        writefile_1.default(path.resolve(config.distDir) + "/" + typeFile.namespace + "/", typeFile.fileName, getModuleDefinitionsPrint_1.default(program, emptyFile, printer, typeFile, constants));
                    });
                    console.timeEnd(logger);
                    return [2 /*return*/];
            }
        });
    });
}
//_______________________________________________________
//
function run(config) {
    var _this = this;
    var storeDir = path.resolve(config.storeDir);
    var distDir = path.resolve(config.distDir);
    var wp = new watchpack_1.default({});
    var printer = ts.createPrinter();
    var emptyFile = ts.createSourceFile("", "", ts.ScriptTarget.ES2015);
    var constants = __assign({}, config_1.config.constants, config.constants);
    cleanUp(distDir);
    if (config.build) {
        writeModuleDefinitions(distDir, storeDir, printer, emptyFile, config, constants);
    }
    else {
        wp.watch([], [storeDir]);
        wp.on("change", function (filePath) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var isExist, cwd, storeDir_1, distTarget;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            isExist = fs.existsSync(filePath);
                            if (!isExist) {
                                cwd = "/Users/takefumi.yoshii/ghe/vuex-guardian-example/";
                                storeDir_1 = path.resolve(config.storeDir);
                                distTarget = path.resolve(cwd + config.distDir + filePath.replace(storeDir_1, ""));
                                fs.removeSync(distTarget);
                            }
                            return [4 /*yield*/, writeModuleDefinitions(distDir, storeDir, printer, emptyFile, config, constants)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); })();
        });
    }
}
exports.run = run;
if (process.env.CLI_DEV) {
    run(config_1.config);
}
