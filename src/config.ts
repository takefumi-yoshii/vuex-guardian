export const baseDir = '.'
export const storeDir = './store'
export const distDir = './types/vuex'
//_______________________________________________________
//
const dependenciesConstants = {
  VUEX: 'vuex',
  STATE: 'state',
  GETTERS: 'getters',
  MUTATIONS: 'mutations',
  ACTIONS: 'actions'
}
//_______________________________________________________
//
const utilityTypesConstants = {
  RETURN_TYPE: 'ReturnType',
  ARGUMENT_2: 'A2'
}
const shimsTypesConstants = {
  STRICT_COMMIT: 'StrictCommit',
  STRICT_DISPATCH: 'StrictDispatch',
  STRICT_CONTEXT: 'StrictContext',
  STRICT_STORE: 'StrictStore',
  ROOT_STATE: 'RootState',
  ROOT_CONTEXT: 'RootContext'
}
const modulesTypesConstants = {
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
}
export const constants = {
  ...dependenciesConstants,
  ...utilityTypesConstants,
  ...shimsTypesConstants,
  ...modulesTypesConstants
}
//_______________________________________________________
//
export const config = {
  baseDir,
  storeDir,
  distDir,
  constants,
  build: false
}
//_______________________________________________________
//
export type Constants = typeof constants
export type Config = typeof config
//_______________________________________________________
//
export default config
