#!/bin/bash
if [ -z "$1" ]
    then
        echo "APP SERVER SCALE IS NOT PROVIDED"
fi

echo "APP SERVER SCALE IS $1"

awk '/UPSTREAM/{n++; next} {print >"nginx_" n ".conf"}' nginx.conf
for (( i = 1; i <= $1; ++i )); do printf '\t\tserver %s_servers_%d:8000;\n' "app" "$i"; done > nginx_upstream.conf
cat nginx_.conf nginx_upstream.conf nginx_1.conf > nginx.processed.conf
rm nginx_.conf
rm nginx_upstream.conf
rm nginx_1.conf

docker-compose -f docker-compose.yml up --scale=$1 --detach