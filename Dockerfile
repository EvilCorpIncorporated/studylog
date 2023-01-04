FROM edgedb/edgedb:2.9

COPY ./dbschema /dbschema

ENV EDGEDB_SERVER_ADMIN_UI​="enabled"
env EDGEDB_SERVER_TLS_CERT_MODE="generate_self_signed"
ENV EDGEDB_SERVER_DEFAULT_AUTH_METHOD​="SCRAM"

