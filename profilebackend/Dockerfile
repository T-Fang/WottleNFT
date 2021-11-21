FROM node:alpine
RUN npm install -g ts-node
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENTRYPOINT ["npm", "start"]