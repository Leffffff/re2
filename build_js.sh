DOCKER_IMAGE=emscripten/emsdk:1.40.1

git submodule update --init --recursive

docker run \
  --rm \
  -v $(pwd):/src \
  $DOCKER_IMAGE \
  bash -c "npm run foundation && npm run compile && npm run patch"
