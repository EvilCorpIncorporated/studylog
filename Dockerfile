FROM edgedb/edgedb:2.9

COPY ./dbschema /dbschema

ENV EDGEDB_SERVER_ADMIN_UI​="enabled"