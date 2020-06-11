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

`source ./emsdk_env.sh`

#### Compile C code

Run `npm run compile` or:

``` bash
em++ re2Wrapper.cc src/re2.cc src/filtered_re2.cc src/prefilter_tree.cc src/regexp.cc src/stringpiece.cc src/unicode_*.cc src/perl_groups.cc src/parse.cc src/rune.cc src/simplify.cc src/compile.cc src/prog.cc src/nfa.cc src/onepass.cc src/prefilter.cc src/dfa.cc src/bitstate.cc src/tostring.cc -o re2Lib.js -s LINKABLE=1 -s EXPORT_ALL=1 -s EXTRA_EXPORTED_RUNTIME_METHODS='["stringToUTF8", "UTF8ToString"]' -s MODULARIZE=1 -s 'EXPORT_NAME="RegExp2"' -O3
```

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
