FROM node:18.1.0
COPY ./front /front
WORKDIR /front
RUN npm install
EXPOSE 3000
ENV CI true