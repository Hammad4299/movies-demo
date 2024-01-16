#/bin/sh

docker push $DOCKER_PROJECT_PATH:latest
docker push $DOCKER_PROJECT_PATH:$RELEASE_VERSION
