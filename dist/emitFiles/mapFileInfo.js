"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ______________________________________________________
//
function mapFileInfo(src, dist) {
    return function (filePath) {
        var fileDir = filePath
            .replace(src + "/", '')
            .split('/');
        var fileName = fileDir[fileDir.length - 1];
        fileDir.pop();
        var nameSpace = fileDir.join('/');
        var distDir = dist + "/" + nameSpace;
        var distFileName = distDir + "/" + fileName;
        var moduleName = fileName === 'index.ts'
            ? fileDir[fileDir.length - 1]
            : fileName.replace('.ts', '');
        return {
            fileName: fileName,
            filePath: filePath,
            fileDir: fileDir,
            distDir: distDir,
            distFileName: distFileName,
            moduleName: moduleName,
            importModulePath: filePath.replace('.ts', ''),
            nameSpace: nameSpace
        };
    };
}
exports.mapFileInfo = mapFileInfo;
