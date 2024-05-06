#!/bin/bash

# usage "bash restart.sh"

# this file is intended for deployemnts only and it will perform a restart of previously active services
# that had been stopped using "stop.sh" but it will not reconfigure the service, or check that it matches
# a new scale, it simply restarts based on the last configuration and it's very friction free
# use "start.sh" for reconfiguring the cluster and playing it safe

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

# now let's loop over our services
while IFS= read -r line; do
    service_name=$(echo "$line" | awk '{split($1, a, "."); print a[1]}')
    echo "enabling $service_name";

    # it is started
    systemctl enable "$service_name.service";
    systemctl start "$service_name.service";
done < <(systemctl list-units --type=service --all | grep "itmzsrv-")