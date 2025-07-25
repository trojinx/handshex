FROM node:18.19.1-slim
WORKDIR /handshex
COPY . .
RUN npm i 
EXPOSE 3000

CMD ["node", "server.js"]
