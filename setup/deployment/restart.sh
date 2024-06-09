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

# now let's loop over our services
for service_name in $(ls /etc/systemd/system | grep itmzsrv-); do
    echo "enabling $service_name";

    # it is started
    systemctl enable "$service_name";
    systemctl start "$service_name";
done