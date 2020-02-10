# FROM node:apline
# COPY ./frontend/website-ui/build/*  /var/www/website

FROM node:13.8.0-alpine as build

# also say
WORKDIR /frontend

# copy the react app to the container
COPY . /frontend/

# prepare the container for builing react
RUN npm install --silent
RUN npm install react-scripts -g --silent
RUN npm run build

# prepare nginx
FROM nginx:1.17.8-alpine
COPY --from=build /frontend/build /var/www/website
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

COPY entrypoint-frontend.sh /usr/local/bin 

# fire up nginx
EXPOSE 80
ENTRYPOINT ["/usr/local/bin/entrypoint-frontend.sh"]

# CMD ["nginx", "-g", "daemon off;"]
