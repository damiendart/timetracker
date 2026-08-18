# Copyright (C) Damien Dart, <damiendart@pobox.com>.
# This file is distributed under the MIT licence. For more information,
# please refer to the accompanying "LICENCE" file.

ARG NODE_IMAGE_VERSION="24-alpine"

FROM node:${NODE_IMAGE_VERSION} AS dependencies
RUN apk add --no-cache go-task
WORKDIR /build
COPY package.json package-lock.json Taskfile.yml .
RUN go-task dependencies

FROM node:${NODE_IMAGE_VERSION} AS build
RUN apk add --no-cache go-task
WORKDIR /build
COPY --from=dependencies /build/node_modules ./node_modules
COPY index.html Taskfile.yml vite.config.js .
COPY src src
RUN go-task build

FROM busybox:1.38
RUN adduser -D http
USER http
WORKDIR /home/http
COPY --from=build /build/dist/* .
EXPOSE 3000
CMD ["busybox", "httpd", "-f", "-v", "-p", "3000"]
