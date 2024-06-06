#!/bin/bash

# usage "bash start.sh [scale] (soft|full)"

# use this script to start the cluster using the nginx.conf that is configured to use a standard http connection

echo "Usage bash start.sh [number of scale] (soft|full)";

# this script needs one parameter for the server scale, as how many extended instances are to be used
if [ -z "$1" ]
    then
        echo "App server scale was not provided"; echo "DEAD"; exit 1;
fi

if [ "$EUID" -ne 0 ]
  then echo "This script should be ran as root";
  exit 1;
fi

if [[ -f "./nginx.conf" ]]; then
    echo "nginx.conf found";
else
    echo "nginx.conf not found";
fi

bash run.sh "$1" "nginx.conf" "$2"