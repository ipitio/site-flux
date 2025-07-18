FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm i
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm run build
