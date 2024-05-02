#!/bin/bash

# this script needs one parameter for the server scale, as how many extended instances are to be used
if [ -z "$1" ]
    then
        echo "App server scale was not provided"; echo "DEAD"; exit 1;
fi

if [[ -f "./nginx.conf" ]]; then
    echo "nginx.conf found"
else
    echo "nginx.conf not found"
    echo "DEAD";
    exit 1;
fi

bash run.sh "$1" "nginx.conf"