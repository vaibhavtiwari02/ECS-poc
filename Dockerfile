# Use a base image with both Nginx and Apache
FROM ubuntu:latest

# Install Nginx, Apache, and necessary utilities
RUN apt-get update && apt-get install -y \
    nginx \
    apache2 \
    && apt-get clean

# Set up Nginx to show a welcome page
RUN echo "Welcome to Nginx!" > /var/www/html/index.html

# Set up Apache to show a welcome page
RUN echo "Welcome to Apache!" > /var/www/html/apache_index.html

# Fix Apache ServerName warning
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Configure Apache to listen on port 8002
RUN sed -i 's/80/8002/' /etc/apache2/ports.conf \
    && sed -i 's/<VirtualHost \*:80>/<VirtualHost \*:8002>/' /etc/apache2/sites-available/000-default.conf

# Configure Nginx to listen on port 8001
RUN echo 'server { listen 8001; location / { root /var/www/html; index index.html; } }' > /etc/nginx/sites-available/default

# Expose ports 8001 for Nginx and 8002 for Apache
EXPOSE 8001 8002

# Create a script to run both services
RUN echo '#!/bin/bash\n\
service apache2 start\n\
service nginx start\n\
tail -f /dev/null' > /start.sh \
    && chmod +x /start.sh

# Set the entry point to run the start script
CMD ["/start.sh"]
