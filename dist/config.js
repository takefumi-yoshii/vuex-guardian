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
var dependenciesConstants = {
    VUEX: "vuex",
    STATE: "state",
    GETTERS: "getters",
    MUTATIONS: "mutations",
    ACTIONS: "actions"
};
var tsUtilityTypesConstants = {
    RETURN_TYPE: "ReturnType"
};
var shimsTypesConstants = {
    ARGUMENT_2: "A2",
    STRICT_COMMIT: "StrictCommit",
    STRICT_DISPATCH: "StrictDispatch",
    STRICT_CONTEXT: "StrictContext",
    STRICT_STORE: "StrictStore",
    ROOT_CONTEXT: "RootContext"
};
var modulesTypesConstants = {
    MODULE: "Module",
    MODULES: "Modules",
    LOCAL_STATE: "LocalState",
    LOCAL_GETTERS: "LocalGetters",
    LOCAL_MUTATION_TYPES: "LocalMutationTypes",
    LOCAL_ACTION_TYPES: "LocalActionTypes",
    LOCAL_CONTEXT: "LocalContext",
    ROOT_STATE: "RootState",
    ROOT_GETTERS: "RootGetters",
    MUTATION_TYPES: "MutationTypes",
    ACTION_TYPES: "ActionTypes"
};
//_______________________________________________________
//
exports.storeDir = "../vuex-guardian-example/store";
exports.distDir = "../vuex-guardian-example/types/vuex";
exports.constants = __assign({}, dependenciesConstants, tsUtilityTypesConstants, shimsTypesConstants, modulesTypesConstants);
exports.config = { storeDir: exports.storeDir, distDir: exports.distDir, constants: exports.constants, build: false };
exports.default = exports.config;
