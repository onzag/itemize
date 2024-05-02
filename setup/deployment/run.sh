#!/bin/bash

# first let's check that awk is installed
if ! command -v awk &> /dev/null; then
    echo "Awk is not installed, please check your installation"
    echo "DEAD";
    exit 1;
fi

# first let's check that nginx is installed and running
if ! command -v nginx &> /dev/null; then
    echo "Nginx is not installed, please check your installation"
    echo "DEAD";
    exit 1;
fi

NGINX_CONFIG_PATH=$(nginx -V 2>&1 | grep -oP '(?<=--conf-path=)[^\s]+');
NEW_NGINX_CONFIG=$2;

# Check that nginx is running
systemctl is-active --quiet nginx;
EXITCODE=$?;

case $EXITCODE in
    0) echo "Nginx is healthy and running";;
    *) echo "Nginx is not running, please check your nginx proxy service"; echo "DEAD"; exit 1;;
esac

# Check that redis is running
systemctl is-active --quiet redis;
EXITCODE=$?;

case $EXITCODE in
    0) echo "Redis is healthy and running";;
    *) echo "Redis is not running, please check your redis service"; echo "DEAD"; exit 1;;
esac

# Check node
EXPECTED_NODE_VERSION="v20.10.0"

if ! command -v node &> /dev/null; then
    echo "Node.js is not installed, please check your installation and ensure you have $EXPECTED_NODE_VERSION installed on your system"
    echo "DEAD";
    exit 1;
fi

# Check node version
CURRENT_NODE_VERSION=$(node --version)
CURRENT_NODE_PATH=$(whereis node)

if [[ "$EXPECTED_NODE_VERSION" == "$CURRENT_NODE_VERSION" ]]; then
    echo "Node.js version is $CURRENT_NODE_VERSION";
else
    echo "Node.js version is not $EXPECTED_NODE_VERSION but $CURRENT_NODE_VERSION the program cannot proceed";
    echo "DEAD";
    exit 1;
fi

# install contents
npm install;
EXITCODE=$?;

case $EXITCODE in
    0) echo "NPM install succeeded";;
    *) echo "Nginx is not running, please check your nginx proxy service with the supplied configuration file"; echo "DEAD"; exit 1;;
esac

# run connection test
npm run connection-test;
EXITCODE=$?;

case $EXITCODE in
    0) echo "Connection test succeeded";;
    *) echo "Connection test failed"; echo "DEAD"; exit 1;;
esac

# Now we want to build the services as given by the scale
mkdir services-processed;
# Loop through each file in the directory
for servicefile in ./services/*; do
    # Check if the item is a file (not a directory)
    if [[ -f "$servicefile" ]]; then
        echo "Processing service: $servicefile";
        # Do whatever you want with the file here

        # Extract filename without extension
        servicename=$(basename -- "$servicefile")
        servicenamenoext="${servicename%.*}"

        if grep -q "\$PORT" "$servicefile"; then
            echo "File $servicename gets applied the scale as an extended service";

            for (( i = 8000; i <= 8000 + $1; i++ ));
                do sed "s/\$PORT/$i/g" "$servicefile" > "./services-processed/itmzsrv_${servicenamenoext}_${i}.service";
            done;
        else
            echo "File $servicename is considered a singular service";
            cp "$servicefile" "./services-processed/itmzsrv_${servicenamenoext}.service";
        fi
    fi
done

SYSTEMD_FOLDER=/etc/systemd/system/;
RELOAD_SYSTEMD=false

# now let's check our services for changes, first let's find our active services
while IFS= read -r line; do
    service_name=$(echo "$line" | awk '{split($1, a, "."); print a[1]}')
    echo "checking $service_name";

    # let's check that our expected services match this
    if [ -e "./services-processed/${service_name}.service" ]; then
        echo "$service_name is required";

        # if we do let's find the file related to the service
        if [ -e "$SYSTEMD_FOLDER/${service_name}.service" ]; then
            echo "$SYSTEMD_FOLDER/${service_name}.service found";
        else
            echo "$SYSTEMD_FOLDER/${service_name}.service could not be found, despite it existing";
            echo "DEAD";
            exit 1;
        fi

        # check that the config files used are the same ones
        if cmp --silent -- "$SYSTEMD_FOLDER/${service_name}.service" "./services-processed/${service_name}.service" ; then
            echo "Service description is equal, no changes required";
        else
            echo "Service description has changed, stopping service";
            cp "./services-processed/${service_name}.service" "$SYSTEMD_FOLDER/${service_name}.service";
            systemctl stop "$service_name.service";
            RELOAD_SYSTEMD=true
        fi
    else
        # if it's not found in the folder it is not required anymore as a service
        echo "$service_name is not required anymore";

        # it is removed
        systemctl stop "$service_name.service";
        systemctl disable "$service_name.service";
        
        if [ -e "$SYSTEMD_FOLDER/${service_name}.service" ]; then
            echo "$SYSTEMD_FOLDER/${service_name}.service found, removing";
            rm "$SYSTEMD_FOLDER/${service_name}.service";
        else
            echo "$SYSTEMD_FOLDER/${service_name}.service could not be found, despite it existing";
        fi

        RELOAD_SYSTEMD=true
    fi
done < <(systemctl list-units --type=service --all | grep "itmzsrv-")

if ["$RELOAD_SYSTEMD" = true]; do
    systemctl daemon-reload;
    systemctl reset-failed;
done;

# Loop through each file in the directory
for servicefile in ./services-processed/*; do
    # Check if the item is a file (not a directory)
    if [[ -f "$servicefile" ]]; then
        echo "Initializing service: $servicefile";
        # Do whatever you want with the file here

        # Extract filename without extension
        servicename=$(basename -- "$servicefile")
        servicenamenoext="${servicename%.*}"

        if [ -e "${SYSTEMD_FOLDER}${servicenamenoext}.service" ]; then
            echo "Service for $servicenamenoext already exists, reenabling and restarting";
            systemctl enable "$servicename";
            systemctl restart "$servicename";
        else
            echo "Installing missing service $servicenamenoext";
            cp "$servicefile" "${SYSTEMD_FOLDER}${servicenamenoext}.service";
            systemctl enable "$servicename";
            systemctl start "$servicename";
        fi
    fi
done

# remove our services-processed folder
rm -r ./services-processed

# Process nginx file by the number of the scale

# now we want to replace the UPSTREAM with as many servers as it will come with, with numbers and with the resulting
# docker name, so UPSTREAM can become something like ubuntu_servers_1:8000 ubuntu_servers_2:8000 etc... as many
# as you planned to spawn
awk '/UPSTREAM/{n++; next} {print >"nginx_" n ".conf"}' "$2"
for (( i = 8000; i <= 8000 + $1; i++ )); do printf '\t\tserver 127.0.0.1:%d;\n' "$i"; done > nginx_upstream.conf
cat nginx_.conf nginx_upstream.conf nginx_1.conf > nginx.processed.conf
rm nginx_.conf
rm nginx_upstream.conf
rm nginx_1.conf

# check that the config files used are the same ones
if cmp --silent -- "$NGINX_CONFIG_PATH" "./nginx.processed.conf"; then
  echo "Nginx configuration is equal, no changes required";
  rm ./nginx.processed.conf;
else
  echo "Nginx configuration was changed";
  cp ./nginx.processed.conf "$NGINX_CONFIG_PATH";
  systemctl reload nginx;
  EXITCODE=$?;
  case $EXITCODE in
    0) echo "Nginx reloaded succesfully";;
    *) echo "Nginx failed to reload"; echo "DEAD"; exit 1;;
  esac
fi