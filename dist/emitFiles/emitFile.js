"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs-extra"));
// ______________________________________________________
//
function emitFile(distDir, fileName, fileBody) {
    if (!fs.existsSync(distDir)) {
        fs.mkdirsSync(distDir);
    }
    fs.writeFileSync(fileName, fileBody);
}
exports.emitFile = emitFile;
