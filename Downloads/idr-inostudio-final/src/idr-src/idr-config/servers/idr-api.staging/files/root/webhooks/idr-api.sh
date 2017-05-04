#!/bin/bash
docker pull registry.git.leebenson.com/idr/api:latest
docker stop idr-api
docker rm idr-api
docker run -d --name idr-front -p 4000:4000 --restart always registry.git.leebenson.com/idr/api:latest
