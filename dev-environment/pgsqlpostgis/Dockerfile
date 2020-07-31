# PGSQL postgis uses postgres 12
# This is a simplified version of https://github.com/postgis/docker-postgis/blob/master/12-3.0/Dockerfile

FROM postgres:12

ENV POSTGIS_MAJOR 3
ENV POSTGIS_VERSION 3.0.1+dfsg-2.pgdg100+1

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR=$POSTGIS_VERSION \
        postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR-scripts=$POSTGIS_VERSION