#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ARGS="-f ${DIR}/../compose/test.yml"
TESTS="${1:-.\*}"

#rebuild
TESTS="$TESTS" docker-compose ${ARGS} build \
  && TESTS="$TESTS" docker-compose ${ARGS} run test