FROM node:16 as node

ARG FIREBASE_CONFIG=${FIREBASE_CONFIG}
ENV FIREBASE_CONFIG=${FIREBASE_CONFIG}

WORKDIR /usr/src/app
COPY package*.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN echo $FIREBASE_CONFIG > src/firebase/firebaseConfig.ts
RUN make build

FROM nginx as server

EXPOSE 80

COPY --from=node /usr/src/app/public /usr/share/nginx/html
COPY --from=node /usr/src/app/nginx.conf /etc/nginx/nginx.conf

