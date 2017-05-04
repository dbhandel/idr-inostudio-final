#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ARGS="-f ${DIR}/../compose/run.yml"

docker-compose ${ARGS} build \
  && docker-compose $ARGS up