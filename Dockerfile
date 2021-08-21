FROM node:14
WORKDIR /ProductsAPI
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3002
EXPOSE 3306
CMD ["npm", "start"]

