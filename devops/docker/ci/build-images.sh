#/bin/sh

# exit when any command fails
set -e
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
REPO_ROOT_DIR=$(pwd)

source $SCRIPT_DIR/variables.sh
source $SCRIPT_DIR/../deps/build-images.sh

docker tag movies-demo $DOCKER_PROJECT_PATH
docker tag movies-demo $DOCKER_PROJECT_PATH:$RELEASE_VERSION
