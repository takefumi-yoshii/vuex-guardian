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
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseDir = '.';
exports.storeDir = './store';
exports.distDir = './types/vuex';
//_______________________________________________________
//
var dependenciesConstants = {
    VUEX: 'vuex',
    STATE: 'state',
    GETTERS: 'getters',
    MUTATIONS: 'mutations',
    ACTIONS: 'actions'
};
//_______________________________________________________
//
var utilityTypesConstants = {
    RETURN_TYPE: 'ReturnType',
    ARGUMENT_2: 'A2'
};
var shimsTypesConstants = {
    STRICT_COMMIT: 'StrictCommit',
    STRICT_DISPATCH: 'StrictDispatch',
    STRICT_CONTEXT: 'StrictContext',
    STRICT_STORE: 'StrictStore',
    ROOT_STATE: 'RootState',
    ROOT_CONTEXT: 'RootContext'
};
var modulesTypesConstants = {
    MODULE: 'Module',
    MODULES: 'Modules',
    LOCAL_STATE: 'LocalState',
    LOCAL_GETTERS: 'LocalGetters',
    LOCAL_MUTATION_TYPES: 'LocalMutationTypes',
    LOCAL_ACTION_TYPES: 'LocalActionTypes',
    LOCAL_CONTEXT: 'LocalContext',
    ROOT_GETTERS: 'RootGetters',
    MUTATION_TYPES: 'MutationTypes',
    ACTION_TYPES: 'ActionTypes'
};
exports.constants = __assign(__assign(__assign(__assign({}, dependenciesConstants), utilityTypesConstants), shimsTypesConstants), modulesTypesConstants);
//_______________________________________________________
//
exports.config = {
    baseDir: exports.baseDir,
    storeDir: exports.storeDir,
    distDir: exports.distDir,
    constants: exports.constants,
    build: false
};
//_______________________________________________________
//
exports.default = exports.config;
