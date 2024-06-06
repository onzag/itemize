#!/bin/bash

# usage "bash start-ssl.sh [scale] (soft|full)"

# use this script to start the cluster using the nginx-ssl.conf that is configured to use a SSL configuration
# make sure that the key and certificate are present as determined by the configuration, the script will check
# for them and refuse to proceed if not found

echo "Usage bash start-ssl.sh [number of scale] (soft|full)";

# this script needs one parameter for the server scale, as how many extended instances are to be used
if [ -z "$1" ]
    then
        echo "App server scale was not provided"; echo "DEAD"; exit 1;
fi

if [ "$EUID" -ne 0 ]
  then echo "This script should be ran as root";
  exit 1;
fi

# we need SSL
if [[ -f "./nginx-ssl.conf" ]]; then
    echo "nginx-ssl.conf found"
else
    echo "nginx-ssl.conf not found"
    echo "DEAD";
    exit 1;
fi

SSL_CERTIFICATE=$(cat nginx-ssl.conf | grep -Po 'ssl_certificate\s+\K\S+(?=;)');
SSL_CERTIFICATE_KEY=$(cat nginx-ssl.conf | grep -Po 'ssl_certificate_key\s+\K\S+(?=;)');

# another SSL check
if [[ -f "$SSL_CERTIFICATE" ]]; then
    echo "$SSL_CERTIFICATE found"
else
    echo "$SSL_CERTIFICATE not found, this file is required for SSL as determined by nginx-ssl.conf";
    echo "DEAD";
    exit 1;
fi

# another SSL check
if [[ -f "$SSL_CERTIFICATE_KEY" ]]; then
    echo "$SSL_CERTIFICATE_KEY found"
else
    echo "$SSL_CERTIFICATE_KEY not found, this file is required for SSL as determined by nginx-ssl.conf";
    echo "DEAD";
    exit 1;
fi

bash run.sh "$1" "nginx-ssl.conf" "$2"