"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ______________________________________________________
//
function mapFileInfo(src, dist) {
    return function (filePath) {
        var fileTreeKeys = filePath
            .replace(src + "/", '')
            .split('/');
        var fileName = fileTreeKeys[fileTreeKeys.length - 1];
        fileTreeKeys.pop();
        var nameSpace = fileTreeKeys.join('/');
        var moduleName = fileName === 'index.ts'
            ? fileTreeKeys[fileTreeKeys.length - 1]
            : fileName.replace('.ts', '');
        var importModulePath = filePath.replace('.ts', '');
        var distDir = dist + "/" + nameSpace;
        var distPath = distDir + "/" + fileName;
        return {
            fileName: fileName,
            filePath: filePath,
            fileTreeKeys: fileTreeKeys,
            nameSpace: nameSpace,
            moduleName: moduleName,
            importModulePath: importModulePath,
            distDir: distDir,
            distPath: distPath
        };
    };
}
exports.mapFileInfo = mapFileInfo;
