#!/bin/sh
./manage.py makemigrations
./manage.py migrate --run-syncdb
# gunicorn --bind 0.0.0.0:8000 --error-logfile=gunicorn_error.log --certfile=./ssl/fullchain.pem --keyfile=./ssl/privkey.pem --log-level=debug website.wsgi
gunicorn --bind 0.0.0.0:8000 --error-logfile=gunicorn_error.log --log-level=debug website.wsgi
