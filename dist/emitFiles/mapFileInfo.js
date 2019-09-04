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
        var fileImportPath = filePath.replace('.ts', '');
        fileTreeKeys.pop();
        var nameSpace = fileTreeKeys.join('/');
        var moduleName = fileName === 'index.ts'
            ? fileTreeKeys[fileTreeKeys.length - 1]
            : fileName.replace('.ts', '');
        var distDir = dist + "/" + nameSpace;
        var distPath = distDir + "/" + fileName;
        return {
            fileName: fileName,
            filePath: filePath,
            fileImportPath: fileImportPath,
            fileTreeKeys: fileTreeKeys,
            nameSpace: nameSpace,
            moduleName: moduleName,
            distDir: distDir,
            distPath: distPath
        };
    };
}
exports.mapFileInfo = mapFileInfo;
