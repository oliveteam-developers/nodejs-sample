FROM node:14.14.0-alpine

RUN apk update && apk upgrade && apk add --no-cache \
	bash \
	curl \
	gettext && \
	npm install -g nodemon && \
	npm install -g pm2 && \
	npm rebuild bcrypt --build-from-source

WORKDIR /var/www

RUN mkdir -p  /var/www 
# && \
#     chown -R  www-data:www-data /var/www

# Copy existing application directory contents
# COPY . /var/www

# Copy existing application directory permissions
# COPY --chown=www-data:www-data . /var/www

# RUN mkdir -p /var/www/.composer && \
#     chown -R www-data:www-data /var/www/.composer
# RUN chown -R www-data:www-data /var/www

# EXPOSE 80

USER root