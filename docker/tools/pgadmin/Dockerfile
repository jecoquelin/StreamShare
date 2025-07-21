FROM dpage/pgadmin4

USER root

# Installer envsubst
RUN apk update && apk add gettext

COPY entrypoint.sh /entrypoint_start.sh
COPY servers.json.template /servers.json.template
COPY pgpass.template /pgpass.template

RUN chmod +x /entrypoint_start.sh

ENTRYPOINT ["/entrypoint_start.sh"]

EXPOSE 80