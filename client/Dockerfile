FROM node:alpine as builder
WORKDIR '/client'
COPY ./package.json ./
RUN yarn
COPY ./ ./
RUN yarn build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
