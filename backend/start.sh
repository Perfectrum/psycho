#!/bin/sh
set -e

python manage.py migrate --no-input
python manage.py collectstatic --no-input

python manage.py runserver 0.0.0.0:6969
