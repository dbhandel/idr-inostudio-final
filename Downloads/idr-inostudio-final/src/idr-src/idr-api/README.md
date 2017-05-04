# IDR API server (api.idorecall.com)

GraphQL API server.

This will serve all public and admin data requests.

# Usage

1. Install the [Docker Toolbox](https://docs.docker.com/engine/installation/) and
ensure it's running.

2. Run `docker-compose up`. This will build the Dockerfile (or
simply copy over any file changes if already built), spawn ArangoDB and 
other required services, and start the server.

3. Navigate to [http://localhost:5000/graphql](http://localhost:4000/graphql) to yield the GraphiQL GUI.
