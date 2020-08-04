#!/bin/bash

# we need SSL
if [[ -f "./key.pem" ]]; then
    echo "key.pem found"
else
    echo "key.pem not found, this file is required for SSL"
    exit 1;
fi

# another SSL check
if [[ -f "./cert.pem" ]]; then
    echo "cert.pem found"
else
    echo "cert.pem not found, this file is required for SSL"
    exit 1;
fi

# this script needs one parameter for the server scale, as how many extended instances are to be used
if [ -z "$1" ]
    then
        echo "APP SERVER SCALE IS NOT PROVIDED"
fi

bash run.sh "$1" "nginx-ssl.conf"