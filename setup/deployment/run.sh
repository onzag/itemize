#!/bin/bash
# This file does the running of the services using SSL or not
# and you are not supposed to call this file directly, use "start.sh" or "start-ssl.sh"

# first let's check that awk is installed
if ! command -v awk &> /dev/null; then
    echo "Awk is not installed, please check your installation"
    echo "DEAD";
    exit 1;
fi

# make it a soft run
SOFT_RUN=$3

# if we are using extended services that need nginx
NEW_NGINX_CONFIG=$2;
if [[ -f "$NEW_NGINX_CONFIG" ]]; then
    # first let's check that nginx is installed and running
    if ! command -v nginx &> /dev/null; then
        echo "Nginx is not installed, please check your installation"
        echo "DEAD";
        exit 1;
    fi

    # Check that nginx is running
    systemctl is-active --quiet nginx;
    EXITCODE=$?;

    case $EXITCODE in
        0) echo "Nginx is healthy and running";;
        *) echo "Nginx is not running, please check your nginx proxy service"; echo "DEAD"; exit 1;;
    esac
fi

# Check node
EXPECTED_NODE_VERSION="v20.10.0"

if ! command -v node &> /dev/null; then
    echo "Node.js is not installed, please check your installation and ensure you have $EXPECTED_NODE_VERSION installed on your system"
    echo "If you installed Node.js using nvm run the following commands from the user that has the nvm";
    echo 'sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/node" "/usr/local/bin/node"'
    echo 'sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npm" "/usr/local/bin/npm"'
    echo 'sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npx" "/usr/local/bin/npx"'
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

# install contents check
if [[ -d "./node_modules" ]]; then
    echo "node_modules exist";
else
    echo "you must run 'bash install.sh' as the user before proceeding";
    echo "DEAD";
    exit 1;
fi

# run connection test
CHECKENV="development";
if [[ -f "./config/db.production.sensitive.json" ]]; then
    CHECKENV="production";    
fi

npm run connection-test "$CHECKENV";
EXITCODE=$?;

case $EXITCODE in
    0) echo "Connection test succeeded";;
    *) echo "Connection test failed"; echo "DEAD"; exit 1;;
esac

if [[ "$SOFT_RUN" == "soft" ]]; then
    echo "This is a soft run and will not build services"
else
    # Now we want to build the services as given by the scale
    mkdir systemd-processed;
    # Loop through each file in the directory
    for servicefile in ./systemd/*; do
        # Check if the item is a file (not a directory)
        if [[ -f "$servicefile" ]]; then
            echo "Processing service: $servicefile";
            # Do whatever you want with the file here

            # Extract filename without extension
            servicename=$(basename -- "$servicefile")
            servicenamenoext="${servicename%.*}"

            if grep -q "\$PORT" "$servicefile"; then
                echo "Service $servicename gets applied the scale as an extended service";

                for (( i = 8000; i < 8000 + $1; i++ ));
                    do sed "s/\$PORT/$i/g" "$servicefile" > "./systemd-processed/itmzsrv-${servicenamenoext}-${i}.service";
                done;
            else
                echo "Service $servicename is considered a singular service";
                cp "$servicefile" "./systemd-processed/itmzsrv-${servicenamenoext}.service";
            fi
        fi
    done

    SYSTEMD_FOLDER=/etc/systemd/system;
    RELOAD_SYSTEMD=false

    echo "Checking currently running systemd services";

    # now let's check our services for changes, first let's find our active services
    while IFS= read -r line; do
        service_name=$(echo "$line" | awk '{split($1, a, "."); print a[1]}')
        echo "checking $service_name";

        # let's check that our expected services match this
        if [ -e "./systemd-processed/${service_name}.service" ]; then
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
            if cmp --silent -- "$SYSTEMD_FOLDER/${service_name}.service" "./systemd-processed/${service_name}.service" ; then
                echo "Service description is equal, no changes required";
            else
                echo "Service description has changed, stopping service";
                cp "./systemd-processed/${service_name}.service" "$SYSTEMD_FOLDER/${service_name}.service";
                systemctl stop "$service_name.service";
                RELOAD_SYSTEMD=true
            fi
        else
            # if it's not found in the folder it is not required anymore as a service
            echo "$service_name is not required anymore, disabling";

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

    if [ "$RELOAD_SYSTEMD" = true ]; then
        echo "Reloading systemd";
        systemctl daemon-reload;
        systemctl reset-failed;
    fi;

    # Loop through each file in the directory
    for servicefile in ./systemd-processed/*; do
        # Check if the item is a file (not a directory)
        if [[ -f "$servicefile" ]]; then
            # Extract filename without extension
            servicename=$(basename -- "$servicefile")
            servicenamenoext="${servicename%.*}"

            echo "Initializing service: $servicenamenoext";

            if [ -e "${SYSTEMD_FOLDER}/${servicenamenoext}.service" ]; then
                echo "Service for $servicenamenoext already exists, reenabling and restarting";
                systemctl enable "$servicename";
                systemctl restart "$servicename";
            else
                echo "Installing missing service $servicenamenoext";
                cp "$servicefile" "${SYSTEMD_FOLDER}/${servicenamenoext}.service";
                systemctl enable "$servicename";
                systemctl start "$servicename";
            fi
        fi
    done

    # remove our systemd-processed folder
    rm -r ./systemd-processed
fi

if [[ -f "$NEW_NGINX_CONFIG" ]]; then
    # Process nginx file by the number of the scale
    NGINX_CONFIG_PATH=$(head -n 1 nginx-config-file);
    # now we want to replace the UPSTREAM with as many servers as it will come with, with numbers and with the resulting
    # docker name, so UPSTREAM can become something like ubuntu_servers_1:8000 ubuntu_servers_2:8000 etc... as many
    # as you planned to spawn
    awk '/UPSTREAM/{n++; next} {print >"nginx_" n ".conf"}' "$NEW_NGINX_CONFIG";
    for (( i = 8000; i < 8000 + $1; i++ )); do printf '\t\tserver 127.0.0.1:%d;\n' "$i"; done > nginx_upstream.conf
    cat nginx_.conf nginx_upstream.conf nginx_1.conf > nginx.processed.conf
    rm nginx_.conf
    rm nginx_upstream.conf
    rm nginx_1.conf

    # check that the config files used are the same ones
    if cmp --silent -- "$NGINX_CONFIG_PATH" "./nginx.processed.conf"; then
    echo "Nginx configuration is equal, no changes required";
    rm ./nginx.processed.conf;
    else
    echo "Nginx configuration was changed, reload required";
    cp ./nginx.processed.conf "$NGINX_CONFIG_PATH";
    systemctl reload nginx;
    EXITCODE=$?;
    case $EXITCODE in
        0) echo "Nginx reloaded succesfully";;
        *) echo "Nginx failed to reload"; echo "DEAD"; exit 1;;
    esac
    fi
fi