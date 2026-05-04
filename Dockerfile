FROM node:lts-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm run build
