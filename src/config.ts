const dependenciesConstants = {
  VUEX: 'vuex',
  STATE: 'state',
  GETTERS: 'getters',
  MUTATIONS: 'mutations',
  ACTIONS: 'actions'
}
const tsUtilityTypesConstants = {
  RETURN_TYPE: 'ReturnType'
}
const shimsTypesConstants = {
  ARGUMENT_2: 'A2',
  STRICT_COMMIT: 'StrictCommit',
  STRICT_DISPATCH: 'StrictDispatch',
  STRICT_CONTEXT: 'StrictContext',
  STRICT_STORE: 'StrictStore',
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
  ROOT_STATE: 'RootState',
  ROOT_GETTERS: 'RootGetters',
  MUTATION_TYPES: 'MutationTypes',
  ACTION_TYPES: 'ActionTypes'
}
//_______________________________________________________
//
export const baseDir = '.'
export const storeDir = './store'
export const distDir = './types/vuex'
export const constants = {
  ...dependenciesConstants,
  ...tsUtilityTypesConstants,
  ...shimsTypesConstants,
  ...modulesTypesConstants
}
export const config = {
  baseDir,
  storeDir,
  distDir,
  constants,
  build: false
}
export type Constants = typeof constants
export type Config = typeof config
export default config
