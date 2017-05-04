#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ARGS="-f ${DIR}/../compose/dev.yml"

docker-compose $ARGS up --build
