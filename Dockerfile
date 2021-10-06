FROM docker-spv.artifactory.gscorp.ad/nginx-spv:1.17.8
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d
RUN mkdir -p /var/log/app
COPY ./nginx/default.conf /etc/nginx/conf.d/
COPY dist/ /usr/share/nginx/html/obi/inversiones
EXPOSE 80
