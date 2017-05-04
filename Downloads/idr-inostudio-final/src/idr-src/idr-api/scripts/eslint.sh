#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
T="eslint-idr-api"
ARGS="-f ${DIR}/../Dockerfile-eslint -t $T ${DIR}/../"

docker build $ARGS && docker run -t $T
