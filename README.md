# RE2

## Zero dependency re2 package powered by emscripten

## Getting Started

### Pull submodule google-re2

`git submodule update --init`

### Emscripten

#### Clone emsdk in _your storage of repos_

`git clone https://github.com/emscripten-core/emsdk.git`

#### Enter that directory

`cd emsdk`

#### Fetch the latest version of the emsdk (not needed the first time you clone)

`git pull`

#### Download and install the latest SDK tools

`./emsdk install latest`

#### Make the "latest" SDK "active" for the current user. (writes ~/.emscripten file)

`./emsdk activate latest`

#### Activate PATH and other environment variables in the current terminal

from emsdk dir:
`source ./emsdk_env.sh`

from re2:
`source ../emsdk/emsdk_env.sh`

#### Compile C code

##### make sure you have permissions to execute the file `chmod +x ./compile.sh`

Run `npm run compile`

#### Testing

`npm test`

### Updating re2 to latest

#### If google-re2 module is updated

```bash
git pull --recurse-submodules
```

#### Then run this script to update re2 package

```bash
npm run build:update
```
