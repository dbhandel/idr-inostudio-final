#!/bin/bash
docker pull registry.git.leebenson.com/idr/front:latest
docker stop idr-front
docker rm idr-front
docker run -d --name idr-front -p 4000:4000 --restart always registry.git.leebenson.com/idr/front:latest
