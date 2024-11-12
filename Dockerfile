FROM node:21.1.0

WORKDIR /app

COPY package*.json .
COPY package-lock.json .
RUN npm install
COPY . .

RUN #npm run build
EXPOSE 4000
CMD ["npm", "run", "start:dev"]