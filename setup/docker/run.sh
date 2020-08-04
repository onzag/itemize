#!/bin/bash

# now we display our server scale
echo "APP SERVER SCALE IS $1"
echo "NGINX CONF IS $2"

# now we want to check for our nginx conf
if [[ -f "./nginx.conf" ]]; then
    # and we want to get our folder name for the docker network names to setup nginx
    LOCALPWD=$(realpath --relative-to="$PWD/.." "$PWD")
    UNSEPARATEDPWD=$(echo ${LOCALPWD//_})
    LOWERED=$(echo $UNSEPARATEDPWD | awk '{print tolower($0)}')

    # now we want to replace the UPSTREAM with as many servers as it will come with, with numbers and with the resulting
    # docker name, so UPSTREAM can become something like ubuntu_servers_1:8000 ubuntu_servers_2:8000 etc... as many
    # as you planned to spawn
    awk '/UPSTREAM/{n++; next} {print >"nginx_" n ".conf"}' "$2"
    for (( i = 1; i <= $1; ++i )); do printf '\t\tserver %s_servers_%d:8000;\n' "$LOWERED" "$i"; done > nginx_upstream.conf
    cat nginx_.conf nginx_upstream.conf nginx_1.conf > nginx.processed.conf
    rm nginx_.conf
    rm nginx_upstream.conf
    rm nginx_1.conf
fi

# now the docker compose is executed with the given scale
docker-compose -f docker-compose.yml up --scale servers=$1 -d