# This script builds the pgsqlpostgis tar gz file
# The reason is that the linux alpine debian build keeps changing its version all the time
# so we need to freeze the imaage otherwise itemize keeps crashing as for some reason the older versions
# keep being deleted from the registry
sudo docker build -t pgsqlpostgis ./
sudo docker save pgsqlpostgis:latest | gzip > ./pgsqlpostgis.tar.gz