FROM postgres:10

LABEL maintainer="Ben M <git@bmagg.com>"
# RUN mkdir -p /var/lib/postgresql/data && chown -R postgres /var/lib/postgresql/data && chmod 775 /var/lib/postgresql/data
# RUN mkdir -p /var/run/postgres
# && chown -R postgres /var/run/postgres && chmod 775 /var/run/postgres

CMD ["postgres"]
# CMD postgres -D /var/lib/postgresql/data -l logfile start -p 5433

EXPOSE 5432
