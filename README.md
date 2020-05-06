# web portfolio
- source .env
- create database -> run script
- ./manage.py migrate --run-syncdb
- docker-compose up -> to run the project


http://127.0.0.1:8000/api/hero/
http://127.0.0.1:8000/api/post/
http://127.0.0.1:8000/api/post/${params.id}/
http://127.0.0.1:8000/api/send_email/
http://127.0.0.1:8000/api/send_email/
http://127.0.0.1:8000/api/links/

find . -type f -name "*.js" -print0 | xargs -0 sed -i '' -e 's/http\:\/\/127\.0\.0\.1\:8000/http\:\/\/134\.122\.101\.171\:8000/g'


include these in /etc/mysql/my.cnf

[mysqld]
character-set-server=utf8

[mysql]
default-character-set=utf8

[client]
default-character-set=utf8


Login into Docker container with docker exec -it mysql_id /bin/bash and run apt-get update
Then run apt-get install vim apt-get install locales
Run dpkg-reconfigure locales and select 384 for ro_RO.UTF-8
Open ~/.bashrc and add
export LANG=ro_RO.utf8

export LANGUAGE=ro_RO.utf8

export LC_ALL=ro_RO.utf8

Exit the shell and restart the container -> docker restart container_id

update post set text=LOAD_FILE('/var/lib/mysql-files/Post2.md') where id=2;