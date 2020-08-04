#!/bin/bash

# this script needs one parameter for the server scale, as how many extended instances are to be used
if [ -z "$1" ]
    then
        echo "APP SERVER SCALE IS NOT PROVIDED"
fi

bash run.sh "$1" "nginx.conf"