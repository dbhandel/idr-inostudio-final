FROM registry.git.leebenson.com/utils/nginx-staging:1.0

EXPOSE 80 443
CMD ["/start.sh"]

COPY files/ /
RUN chmod +x start.sh
