# RE2

## Getting Started

### Installation

``` bash
npm i wasm-re2
```

### Usage

``` typescript
import { RE2 } from 'wasm-re2';

const regex = new RE2('(b|^a)', 'g');

const isFound = regex.test('aabc');
// true

const matches = regex.exec('aabc');
// [ ['a', 'a'], ['b', 'b'] ]
```

## API

### `RE2.test(string)`

Executes a search for a match between a regular expression and a specified string.

Returns true or false.

### `RE2.exec(string)`

Returns all matches of the regular expression against a string.

Works like non-iterable RegExp matchAll.

Exec returns all results in a 2D array where each result consists of [fullmatch, ...captureMathces].

Example:

```typescript
const regex = new RE2('(abc)\\d+(zxc)', 'g');

regex.exec('123abc123zxc123abc123zxc123')
// [ ['abc123zxc', 'abc', 'zxc'], ['abc123zxc', 'abc', 'zxc'] ]
```

### `RE2.replace(string, rewrite)`

Return a new string with some or all matches of a pattern replaced by a replacement.

### `RE2.numberOfCaptureGroups()`

Returns number of capture groups.

## Working with Emscripten

### For Mac

If you use mac proceed to [Pull submodule google-re2](#pull-submodule-google-re2).
You need node and python to be installed.

### For Windows

Install Debian from Microsoft Store, then launch and create UNIX user.

```
Enter new UNIX username:
New password:
Retype new password:
```

Then launch:

```
sudo apt-get update -y && sudo apt-get install nodejs npm git python -y
```

Install Subsystem WSL using Setting on Windows 10:

1. Open `Settings`.
2. Click on `Apps`.
3. Under the `Related settings` section, click the `Programs and Features` option.
4. Click the `Turn Windows features on or off` option on the left pane.
5. Check the `Windows Subsystem` for the Linux checkbox.
6. Click the `OK` button.
7. Then you need to reboot the PC.

Launch IDE with WSL, and do all next actions in WSL Terminal.

### Pull submodule google-re2

`git submodule update --init`

### Clone emsdk in _your storage of repos_

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

from emsdk dir:
`source ./emsdk_env.sh`

from re2:
`source ../emsdk/emsdk_env.sh`

### Compile C code

#### Install dependencies

`npm i`

#### Update/create foundation folder running

`npm run foundation`

##### Make sure you have permissions to execute the file `chmod +x ./compile.sh`

Run script `npm run compile`

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

### Rollup

To change rollup configuration read `Rollup_FAQ.md` in `yaml-core` package or visit <https://rollupjs.org/guide/en/>.
