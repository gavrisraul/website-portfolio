#!/bin/sh
source ../.env
./manage.py makemigrations
./manage.py migrate --run-syncdb
gunicorn --bind 0.0.0.0:8000 --log-level=debug website.wsgi