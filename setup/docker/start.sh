#!/bin/bash
if [ -z "$1" ]
    then
        echo "APP SERVER SCALE IS NOT PROVIDED"
fi

if [[ -f "./key.pem" ]]; then
    echo "key.pem found"
else
    echo "key.pem not found, this file is required for SSL"
    exit 1;
fi

if [[ -f "./cert.pem" ]]; then
    echo "cert.pem found"
else
    echo "cert.pem not found, this file is required for SSL"
    exit 1;
fi

echo "APP SERVER SCALE IS $1"

LOCALPWD=$(realpath --relative-to="$PWD/.." "$PWD")
UNSEPARATEDPWD=$(echo ${LOCALPWD//_})
LOWERED=$(echo $UNSEPARATEDPWD | awk '{print tolower($0)}')

awk '/UPSTREAM/{n++; next} {print >"nginx_" n ".conf"}' nginx.conf
for (( i = 1; i <= $1; ++i )); do printf '\t\tserver %s_servers_%d:8000;\n' "$LOWERED" "$i"; done > nginx_upstream.conf
cat nginx_.conf nginx_upstream.conf nginx_1.conf > nginx.processed.conf
rm nginx_.conf
rm nginx_upstream.conf
rm nginx_1.conf

docker-compose -f docker-compose.yml up --scale servers=$1 -d