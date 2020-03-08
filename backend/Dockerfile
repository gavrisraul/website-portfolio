FROM python:3.6

WORKDIR /backend

COPY . /backend

# RUN apt-get update -y && apt-get install gcc libzbar-dev -y
RUN apt-get update -y
RUN apt-get install default-libmysqlclient-dev  -y

RUN pip install -r requirements.txt

# COPY entrypoint-backend.sh /usr/local/bin 

RUN /bin/bash -c 'echo "$(cat .env-for-source)" >> /root/.bashrc'

EXPOSE 8000

ENTRYPOINT ["/backend/entrypoint-backend.sh"]



# CMD ["gunicorn", "--log-level", "debug", "website.wsgi"]
# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "website.wsgi"]