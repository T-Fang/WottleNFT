FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
ARG TESTNET_API
ARG MAINNET_API
ARG PROFILE_API
ENV TESTNET_API ${TESTNET_API}
ENV MAINNET_API ${MAINNET_API}
ENV PROFILE_API ${PROFILE_API}
COPY . .
RUN npm run build
ENTRYPOINT [ "npm", "start"]