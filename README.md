# RE2

Copy origin files from google-re2 library

## From re2

``` bash
cp google-re2/re2/*.cc src
```

``` bash
cp google-re2/re2/*.h src
```

## From util

``` bash
cp google-re2/util/*.cc src
```

``` bash
cp google-re2/util/*.h src
```

### _In __src/__ global replace from `#include "(?:re2|util)/` to `#include "`_

# emscripten

## Clone git repo in _your repository with projects_

`git clone https://github.com/emscripten-core/emsdk.git`

### Enter that directory

`cd emsdk`

### Fetch the latest version of the emsdk (not needed the first time you clone)

`git pull`

### Download and install the latest SDK tools

`./emsdk install latest`

### Make the "latest" SDK "active" for the current user. (writes ~/.emscripten file)

`./emsdk activate latest`

### Activate PATH and other environment variables in the current terminal

`source ./emsdk_env.sh`

# Runnner

```
em++ re2Wrapper.cc src/re2.cc src/filtered_re2.cc src/prefilter_tree.cc src/regexp.cc src/stringpiece.cc src/unicode_*.cc src/perl_groups.cc src/parse.cc src/rune.cc src/simplify.cc src/compile.cc src/prog.cc src/nfa.cc src/onepass.cc src/prefilter.cc src/dfa.cc src/bitstate.cc src/tostring.cc -o re2Lib.js -s LINKABLE=1 -s EXPORT_ALL=1 -s EXTRA_EXPORTED_RUNTIME_METHODS='["stringToUTF8", "UTF8ToString"]' -s MODULARIZE=1 -s 'EXPORT_NAME="RegExp2"' -O3
```

## Pull submodule google-re2

`git submodule update --init`
