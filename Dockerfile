FROM node:10.16.0-alpine As builder
EXPOSE 8080
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:10.16.0-alpine
EXPOSE 8080
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package.json /usr/src/app/package-lock.json ./
COPY --from=builder /usr/src/app/dist ./dist/
RUN npm install
CMD ["npm", "start"]
