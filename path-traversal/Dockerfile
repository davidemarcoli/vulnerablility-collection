FROM httpd:2.4
COPY . /
CMD ["cd /usr/local/apache2/conf/ && echo '<Directory ~ \"/*\">Options +Indexes</Directory>' >> httpd.conf"]
ENTRYPOINT ["httpd-foreground"]