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
        var moduleName = fileName === 'index.ts'
            ? fileDir[fileDir.length - 1]
            : fileName.replace('.ts', '');
        var importModulePath = filePath.replace('.ts', '');
        var distDir = dist + "/" + nameSpace;
        var distPath = distDir + "/" + fileName;
        return {
            fileName: fileName,
            filePath: filePath,
            fileDir: fileDir,
            nameSpace: nameSpace,
            moduleName: moduleName,
            importModulePath: importModulePath,
            distDir: distDir,
            distPath: distPath
        };
    };
}
exports.mapFileInfo = mapFileInfo;
