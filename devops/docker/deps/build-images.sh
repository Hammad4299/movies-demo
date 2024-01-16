imageName="movies-demo"
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

docker build $DOCKER_BUILD_PARAMS \
    $COMMON_ARGS \
    $COMMON_DOCKER_CACHE_SOURCES \
    -f devops/docker/deps/Dockerfile \
    -t $imageName \
    .
