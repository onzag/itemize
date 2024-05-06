#!/bin/bash

# usage "bash stop.sh"

# use this function to stop the services of an active cluster, it will not stop
# nginx or any other related local service but only the ones managed by itemize

if [ "$EUID" -ne 0 ]
  then echo "This script should be ran as root";
  exit 1;
fi

# first let's check that awk is installed
if ! command -v awk &> /dev/null; then
    echo "Awk is not installed, please check your installation"
    echo "DEAD";
    exit 1;
fi

# now let's loop over our active services
while IFS= read -r line; do
    service_name=$(echo "$line" | awk '{split($1, a, "."); print a[1]}')
    echo "disabling $service_name";

    # it is removed
    systemctl stop "$service_name.service";
    systemctl disable "$service_name.service";
done < <(systemctl list-units --type=service --all | grep "itmzsrv-")