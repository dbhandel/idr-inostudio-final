#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ARGS="-f ${DIR}/../compose/test.yml"

docker-compose ${ARGS} down -v \
&& docker-compose ${ARGS} rm -f \
  && docker-compose ${ARGS} kill