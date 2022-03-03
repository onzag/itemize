# PGSQL postgis uses postgres 13
# This is a simplified version of https://github.com/postgis/docker-postgis/blob/master/13-3.2/Dockerfile

FROM postgres:13-bullseye

ENV POSTGIS_MAJOR 3
ENV POSTGIS_VERSION 3.2.1+dfsg-1.pgdg110+1

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR=$POSTGIS_VERSION \
        postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR-scripts