# vuex-guardian
Vuex had a problem with type definition.
Without references, we can not enable type inference for type definitions.
This tool was born to solve this problem by generating "Reference Types".
This module is operated and used from CLI.


### ⚠️ Disclaimer
Currently this package is a beta version.
And the usage environment assumes "Module Mode of Nuxt.js".


### ✅ Usage
All you need to do is download this package with npm and start the process.
This process monitors the Store directory and generate "Reference Types" to the Vuex Modules defined there.
```
$ yarn install -D vuex-guardian
$ vuex-guardian
```


### ⚙ Setup
Create a file `vuex-guardian.config.js` at the root of your repository.
This configuration file only specifies the store directory to be monitored and the output destination.
**'distDir' and generated filed, should be included in .gitignore.**
```
module.exports = {
  storeDir: "./store",
  distDir: "./types/vuex"
}
```
By default, this specification is applied.
Please commit the configuration file if necessary.


### 📝 Example
Refer to the following repository for sample code using this tool.

