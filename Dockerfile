FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["serve","-p","3001","-s","dist"]
