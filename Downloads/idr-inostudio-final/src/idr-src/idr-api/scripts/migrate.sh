#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ARGS="-f ${DIR}/../compose/migrate.yml"
MIGRATE="${1:-migrate:latest}"

docker-compose $ARGS build \
  && MIGRATE="$MIGRATE" docker-compose $ARGS run server
