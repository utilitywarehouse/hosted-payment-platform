FROM node:12.18.3-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --production

COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm","start"]
